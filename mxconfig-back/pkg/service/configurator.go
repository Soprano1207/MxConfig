package service

import (
	"errors"
	"fmt"
	"mxconfig-back/pkg/entity"
	"mxconfig-back/pkg/repository"
	"mxconfig-back/pkg/utils"
	"reflect"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ConfiguratorService struct {
	repos repository.Configurator
}

func NewConfiguratorService(configuratorRepo repository.Configurator) *ConfiguratorService {
	return &ConfiguratorService{repos: configuratorRepo}
}

func (s *ConfiguratorService) AddToConfiguration(gc *gin.Context) (interface{}, error) {

	mapData := make(map[string]string)
	if err := gc.ShouldBindJSON(&mapData); err != nil {
		return nil, err
	}

	// mapComponents := make(map[string]interface{})
	for key, value := range mapData {
		strct, err := utils.GetTypeComponent(key)
		if err != nil {
			return nil, errors.New("ошибка определения типа компонента")
		}

		resultType := reflect.New(reflect.TypeOf(strct)).Elem()

		id, err := primitive.ObjectIDFromHex(value)
		if err != nil {
			return nil, errors.New("ошибка преобразования ID")
		}

		filter := bson.D{{Key: "_id", Value: id}}

		result, err := s.repos.FindOne(key, filter, resultType)
		if err != nil {
			return nil, err
		}

		fmt.Println("")
		fmt.Println(result)
	}

	return nil, nil

}

func (s *ConfiguratorService) GetConfigurationComponents(gc *gin.Context) (interface{}, error) {
	needleComponent := gc.Param("type")
	requestParams := gc.Request.URL.Query()

	mapDataComponents := make(map[string]interface{})
	for key, value := range requestParams {
		strct, err := utils.GetTypeComponent(key)
		if err != nil {
			return nil, errors.New("ошибка определения типа компонента")
		}

		resultType := reflect.New(reflect.TypeOf(strct)).Elem()

		id, err := primitive.ObjectIDFromHex(value[0])
		if err != nil {
			return nil, errors.New("ошибка преобразования ID")
		}

		filter := bson.D{{Key: "_id", Value: id}}

		result, err := s.repos.FindOne(key, filter, resultType)
		if err != nil {
			return nil, err
		}

		mapDataComponents[key] = result
	}

	fmt.Println("\nMAP_DATA: ", mapDataComponents)

	switch needleComponent {
	case "processor":
		return s.getProcessor(mapDataComponents)
	case "motherboard":
		s.getMotherboard(mapDataComponents)
	}

	return nil, nil
}

func (s *ConfiguratorService) getProcessor(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key)

		switch key {
		case "motherboard":
			if motherboard, ok := value.(entity.Motherboard); ok {
				filter = append(filter, bson.E{Key: "socket", Value: motherboard.Socket})
			} else {
				return nil, errors.New("value is not of type entity.Motherboard")
			}
		}
	}

	componentType, err := utils.GetTypeComponent("processor")
	if err != nil {
		return nil, err
	}

	componentStruct, err := utils.GetStructCompnent(componentType)
	if err != nil {
		return nil, err
	}

	sliceType := reflect.SliceOf(componentStruct)
	resultType := reflect.New(sliceType).Elem()

	result, err := s.repos.FindAll("processor", filter, resultType)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *ConfiguratorService) getMotherboard(mapDataComponents map[string]interface{}) {
	//получаем ключевые поля для материнки по которым будем фильтровать

}

// func (s *UserService) SignUp(gc *gin.Context) (string, error) {
// 	var user entity.User

// 	if err := gc.ShouldBindJSON(&user); err != nil {
// 		return "", err
// 	}

// 	if user.Confirmpassword != user.Password {
// 		return "", errors.New("пароли не совпадают")
// 	}

// 	componentStruct, err := utils.GetStructCompnent(user)
// 	if err != nil {
// 		return "", err
// 	}

// 	userCollection := strings.ToLower(componentStruct.Name())
// 	resultType := reflect.New(reflect.TypeOf(user)).Elem()

// 	filter := bson.D{bson.E{Key: "login", Value: user.Login}}
// 	result, err := s.repos.FindOne(userCollection, filter, resultType)
// 	if err != nil {
// 		return "", err
// 	}
// 	if result != nil {
// 		return "", errors.New("пользователь с таким логином уже зарегистрирован")
// 	}

// 	filter = bson.D{bson.E{Key: "email", Value: user.Email}}
// 	findResult, err := s.repos.FindOne(userCollection, filter, resultType)
// 	if err != nil {
// 		return "", err
// 	}
// 	if findResult != nil {
// 		return "", errors.New("пользователь с таким email уже зарегистрирован")
// 	}

// 	createdToken, create, endTime, err := createToken(user)
// 	if err != nil {
// 		return "", err
// 	}

// 	var token entity.Token
// 	token.Token = createdToken
// 	token.EndTime = int(endTime)
// 	token.Create = int(create)

// 	tokenStruct, err := utils.GetStructCompnent(token)
// 	if err != nil {
// 		return "", err
// 	}

// 	tokenCollection := strings.ToLower(tokenStruct.Name())

// 	_, err = s.repos.InsertOne(tokenCollection, token)
// 	if err != nil {
// 		return "", errors.New("возникла ошибка при создании токена")
// 	}

// 	user.Token = token.Token

// 	insertUserResult, err := s.repos.InsertOne(userCollection, user)
// 	if err != nil {
// 		return "", errors.New("возникла ошибка при создании пользователя")
// 	}

// 	fmt.Printf("Inserted User ID: %v\n", insertUserResult.InsertedID)

// 	return token.Token, nil
// }
