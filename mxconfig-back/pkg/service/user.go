package service

import (
	"errors"
	"fmt"
	"mxconfig-back/pkg/entity"
	"mxconfig-back/pkg/repository"
	"mxconfig-back/pkg/utils"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

type UserService struct {
	repos repository.User
}

func NewUserService(userRepo repository.User) *UserService {
	return &UserService{repos: userRepo}
}

func (s *UserService) Authorization(gc *gin.Context) (interface{}, error) {
	token := gc.Request.Header["Authorization"][0][7:]

	login, _, _, err := utils.ParseToken(token)
	if err != nil {
		return nil, err
	}

	var person entity.User

	filter := bson.D{{Key: "login", Value: login}}
	findedUser, err := s.repos.FindOne("user", filter, &person)
	if err != nil {
		return nil, err
	}

	return findedUser, nil
}

func (s *UserService) SignIn(gc *gin.Context) (interface{}, error) {
	var user entity.User

	if err := gc.ShouldBindJSON(&user); err != nil {
		return user, err
	}

	componentStruct, err := utils.GetStruct(user)
	if err != nil {
		return user, err
	}

	userCollection := strings.ToLower(componentStruct.Name())
	resultType := reflect.New(reflect.TypeOf(user)).Elem()

	filter := bson.D{{Key: "email", Value: user.Email}, {Key: "password", Value: user.Password}}
	result, err := s.repos.FindOne(userCollection, filter, resultType)
	if err != nil {
		return user, err
	}
	if result == nil {
		return user, errors.New("неыерный email или пароль")
	}

	return result, nil

}

func (s *UserService) SignUp(gc *gin.Context) (string, error) {
	var user entity.User

	if err := gc.ShouldBindJSON(&user); err != nil {
		return "", err
	}

	if user.Confirmpassword != user.Password {
		return "", errors.New("пароли не совпадают")
	}

	filter := bson.D{bson.E{Key: "login", Value: user.Login}}
	result, err := s.repos.FindOne("user", filter, &user)
	if err != nil {
		return "", err
	}
	if result != nil {
		return "", errors.New("пользователь с таким логином уже зарегистрирован")
	}

	filter = bson.D{bson.E{Key: "email", Value: user.Email}}
	findResult, err := s.repos.FindOne("user", filter, &user)
	if err != nil {
		return "", err
	}
	if findResult != nil {
		return "", errors.New("пользователь с таким email уже зарегистрирован")
	}

	createdToken, create, endTime, err := utils.CreateToken(user)
	if err != nil {
		return "", err
	}

	var token entity.Token
	token.Token = createdToken
	token.EndTime = int(endTime)
	token.Create = int(create)

	_, err = s.repos.InsertOne("token", token)
	if err != nil {
		return "", errors.New("возникла ошибка при создании токена")
	}

	user.Token = token.Token

	insertUserResult, err := s.repos.InsertOne("user", user)
	if err != nil {
		return "", errors.New("возникла ошибка при создании пользователя")
	}

	fmt.Printf("Inserted User ID: %v\n", insertUserResult.InsertedID)

	return token.Token, nil
}
