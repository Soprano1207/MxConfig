package service

import (
	"errors"
	"fmt"
	"mxconfig-back/pkg/entity"
	"mxconfig-back/pkg/repository"
	"mxconfig-back/pkg/utils"

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

func (s *ConfiguratorService) GetUserConfiguration(gc *gin.Context) (interface{}, error) {
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

	if user, ok := findedUser.(*entity.User); ok {
		mapDataComponents := make(map[string]interface{})
		for key, value := range user.Configurations {
			fmt.Printf("\n\nFOR: %v %v", key, value)

			strct, err := utils.GetTypeComponent(key)
			if err != nil {
				return nil, errors.New("ошибка определения типа компонента")
			}

			filter := bson.D{{Key: "_id", Value: value}}

			result, err := s.repos.FindOne(key, filter, strct)
			if err != nil {
				return nil, err
			}

			mapDataComponents[key] = result
		}

		return mapDataComponents, nil
	} else {
		return nil, errors.New("значение не принадлежит типу User")
	}
}

func (s *ConfiguratorService) RemoveFromConfiguration(gc *gin.Context) (interface{}, error) {
	var requestComponent entity.RequestComponent

	if err := gc.ShouldBindJSON(&requestComponent); err != nil {
		return "", err
	}

	authHeader := gc.Request.Header.Get("Authorization")
	if len(authHeader) < 8 {
		return nil, errors.New("неверный формат заголовка Authorization")
	}

	token := authHeader[7:]

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

	user, ok := findedUser.(*entity.User)
	if !ok {
		return nil, errors.New("пользователь не найден или имеет неверный тип")
	}

	delete(user.Configurations, requestComponent.ComponentType)

	update := bson.M{
		"$set": bson.M{
			"configurations": user.Configurations,
		},
	}

	result, err := s.repos.UpdateByID("user", user.ID, update)
	if err != nil {
		return "", errors.New("возникла ошибка при обновлении")
	}

	return result.ModifiedCount, nil
}

func (s *ConfiguratorService) AddToConfiguration(gc *gin.Context) (interface{}, error) {
	var requestComponent entity.RequestComponent

	if err := gc.ShouldBindJSON(&requestComponent); err != nil {
		return "", err
	}

	authHeader := gc.Request.Header.Get("Authorization")
	if len(authHeader) < 8 {
		return nil, errors.New("неверный формат заголовка Authorization")
	}

	token := authHeader[7:]

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

	user, ok := findedUser.(*entity.User)
	if !ok {
		return nil, errors.New("пользователь не найден или имеет неверный тип")
	}

	if user.Configurations == nil {
		user.Configurations = make(map[string]primitive.ObjectID)
	}

	id, err := primitive.ObjectIDFromHex(requestComponent.ComponentId)
	if err != nil {
		return nil, errors.New("ошибка преобразования ID")
	}

	user.Configurations[requestComponent.ComponentType] = id

	update := bson.M{
		"$set": bson.M{
			"configurations": user.Configurations,
		},
	}

	result, err := s.repos.UpdateByID("user", user.ID, update)
	if err != nil {
		return "", errors.New("возникла ошибка при обновлении")
	}

	return result.ModifiedCount, nil
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

		id, err := primitive.ObjectIDFromHex(value[0])
		if err != nil {
			return nil, errors.New("ошибка преобразования ID")
		}

		filter := bson.D{{Key: "_id", Value: id}}

		result, err := s.repos.FindOne(key, filter, strct)
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
		return s.getMotherboard(mapDataComponents)
	case "cooler":
		return s.getCooler(mapDataComponents)
	case "ram":
		return s.getRam(mapDataComponents)
	case "videocard":
		return s.getVideocard(mapDataComponents)
	case "hdd":
		return s.getHdd(mapDataComponents)
	case "ssd":
		return s.getSsd(mapDataComponents)
	case "powersupply":
		return s.getPowersupply(mapDataComponents)
	case "case":
		return s.getCase(mapDataComponents)

	default:
		return nil, errors.New("не удалось определить тип компонента на этапе конфигурации")
	}
}

func (s *ConfiguratorService) getCase(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "case"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key, value)
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}
func (s *ConfiguratorService) getPowersupply(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "powersupply"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key, value)
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}
func (s *ConfiguratorService) getSsd(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "ssd"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key, value)
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}
func (s *ConfiguratorService) getHdd(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "hdd"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key, value)
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}
func (s *ConfiguratorService) getVideocard(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "videocard"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key, value)
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *ConfiguratorService) getRam(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "ram"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key, value)
		switch key {
		case "motherboard":
			if strct, ok := value.(*entity.Motherboard); ok {
				filter = append(filter, bson.E{Key: "type", Value: strct.Ramtype})
			} else {
				return nil, errors.New("значение не принадлежит типу Motherboard")
			}
		}
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *ConfiguratorService) getProcessor(mapDataComponents map[string]interface{}) (interface{}, error) {
	// Получаем ключевые поля для процессора по которым будем фильтровать
	component := "processor"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key)

		switch key {
		case "motherboard":
			if strct, ok := value.(*entity.Motherboard); ok {
				filter = append(filter, bson.E{Key: "socket", Value: strct.Socket})
			} else {
				return nil, errors.New("значение не принадлежит типу Motherboard")
			}
		}
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *ConfiguratorService) getMotherboard(mapDataComponents map[string]interface{}) (interface{}, error) {
	//получаем ключевые поля для материнки по которым будем фильтровать
	component := "motherboard"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key)

		switch key {
		case "processor":
			if strct, ok := value.(*entity.Processor); ok {
				filter = append(filter, bson.E{Key: "socket", Value: strct.Socket})
			} else {
				return nil, errors.New("значение не принадлежит типу Processor")
			}
		case "ram":
			if strct, ok := value.(*entity.Ram); ok {
				filter = append(filter, bson.E{Key: "ramtype", Value: strct.Type})
			} else {
				return nil, errors.New("значение не принадлежит типу Ram")
			}
		}
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *ConfiguratorService) getCooler(mapDataComponents map[string]interface{}) (interface{}, error) {
	//получаем ключевые поля для материнки по которым будем фильтровать
	component := "cooler"

	filter := bson.D{}
	for key, value := range mapDataComponents {
		fmt.Println(key)

		switch key {
		case "processor":
			if strct, ok := value.(*entity.Processor); ok {
				filter = append(filter, bson.E{Key: "socket", Value: strct.Socket})
			} else {
				return nil, errors.New("значение не принадлежит типу Processor")
			}
		case "motherboard":
			if strct, ok := value.(*entity.Motherboard); ok {
				filter = append(filter, bson.E{Key: "socket", Value: strct.Socket})
			} else {
				return nil, errors.New("значение не принадлежит типу Motherboard")
			}
		}
	}

	strct, err := utils.GetTypeComponent(component)
	if err != nil {
		return nil, errors.New("ошибка определения типа компонента")
	}

	result, err := s.repos.FindAll(component, filter, strct)
	if err != nil {
		return nil, err
	}

	return result, nil
}

// func (s *UserService) SignUp(gc *gin.Context) (string, error) {
// 	var user entity.User

// 	if err := gc.ShouldBindJSON(&user); err != nil {
// 		return "", err
// 	}

// 	if user.Confirmpassword != user.Password {
// 		return "", errors.New("пароли не совпадают")
// 	}

// 	componentStruct, err := utils.GetStruct(user)
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

// 	tokenStruct, err := utils.GetStruct(token)
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
