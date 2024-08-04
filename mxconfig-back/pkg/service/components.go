package service

import (
	"fmt"
	"mxconfig-back/pkg/entity"
	"mxconfig-back/pkg/repository"
	"mxconfig-back/pkg/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

type ComponentService struct {
	repos repository.Components
	// Service *Service
}

func NewComponentService(repos repository.Components) *ComponentService {
	return &ComponentService{repos: repos}
}

// ФИЛЬТР
func (s *ComponentService) GetFilterComponents(gc *gin.Context) (interface{}, error) {
	filterType := gc.Param("type")
	filterStrct := entity.Filter{}

	filters, err := s.repos.FindAll(filterType, bson.D{}, &filterStrct)
	if err != nil {
		return nil, err
	}

	return filters, nil
}

// REST
func (s *ComponentService) CreateComponent(st *interface{}) {
	s.repos.CreateComponent(st)
}

func (s *ComponentService) GetComponents(gc *gin.Context) (interface{}, error) {
	componentType := gc.Param("type")
	component, err := utils.GetTypeComponent(componentType)
	if err != nil {
		return nil, err
	}

	params := gc.Request.URL.Query()
	parseParams := utils.ParseQuery(params)

	fmt.Println("PARAMS")
	for key, v := range parseParams {
		fmt.Println(key, v, len(v))
	}

	filter := make(bson.D, 0)

	for key, value := range parseParams {
		interfaceValues := make([]interface{}, len(value))
		copy(interfaceValues, value)

		filter = append(filter, bson.E{Key: key, Value: bson.M{"$in": interfaceValues}})
	}

	jsonFilter, _ := bson.MarshalExtJSON(filter, true, true)
	fmt.Println(string(jsonFilter))

	components, err := s.repos.FindAll(componentType, filter, component)
	if err != nil {
		return nil, err
	}

	return components, nil
}
