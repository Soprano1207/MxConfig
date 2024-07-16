package service

import (
	"errors"
	"fmt"
	"mxconfig-back/pkg/entity"
	"mxconfig-back/pkg/repository"
	"mxconfig-back/pkg/utils"
	"reflect"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
)

var secretKey = []byte("my-hard-secret-key")

type UserService struct {
	repos repository.User
}

func NewUserService(userRepo repository.User) *UserService {
	return &UserService{repos: userRepo}
}

func (s *UserService) SignIn(gc *gin.Context) (interface{}, error) {
	var user entity.User

	if err := gc.ShouldBindJSON(&user); err != nil {
		return user, err
	}

	componentStruct, err := utils.GetStructCompnent(user)
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

	componentStruct, err := utils.GetStructCompnent(user)
	if err != nil {
		return "", err
	}

	userCollection := strings.ToLower(componentStruct.Name())
	resultType := reflect.New(reflect.TypeOf(user)).Elem()

	filter := bson.D{bson.E{Key: "login", Value: user.Login}}
	result, err := s.repos.FindOne(userCollection, filter, resultType)
	if err != nil {
		return "", err
	}
	if result != nil {
		return "", errors.New("пользователь с таким логином уже зарегистрирован")
	}

	filter = bson.D{bson.E{Key: "email", Value: user.Email}}
	findResult, err := s.repos.FindOne(userCollection, filter, resultType)
	if err != nil {
		return "", err
	}
	if findResult != nil {
		return "", errors.New("пользователь с таким email уже зарегистрирован")
	}

	createdToken, create, endTime, err := createToken(user)
	if err != nil {
		return "", err
	}

	var token entity.Token
	token.Token = createdToken
	token.EndTime = int(endTime)
	token.Create = int(create)

	tokenStruct, err := utils.GetStructCompnent(token)
	if err != nil {
		return "", err
	}

	tokenCollection := strings.ToLower(tokenStruct.Name())

	_, err = s.repos.InsertOne(tokenCollection, token)
	if err != nil {
		return "", errors.New("возникла ошибка при создании токена")
	}

	user.Token = token.Token

	insertUserResult, err := s.repos.InsertOne(userCollection, user)
	if err != nil {
		return "", errors.New("возникла ошибка при создании пользователя")
	}

	fmt.Printf("Inserted User ID: %v\n", insertUserResult.InsertedID)

	return token.Token, nil
}

func createToken(user entity.User) (string, int64, int64, error) {
	createTime := time.Now().Unix()
	endTime := time.Now().Add(time.Hour).Unix()

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		// "sub": id
		"login": user.Login,
		"exp":   endTime,
		"iat":   createTime,
	})

	tokenString, err := claims.SignedString(secretKey)
	if err != nil {
		return "", 0, 0, errors.New("ошибка создания токена")
	}

	return tokenString, createTime, endTime, nil
}
