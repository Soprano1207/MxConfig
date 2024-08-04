package service

import (
	"mxconfig-back/pkg/repository"

	"github.com/gin-gonic/gin"
)

type Component interface {
	CreateComponent(*interface{})
	GetFilterComponents(*gin.Context) (interface{}, error)
	GetComponents(*gin.Context) (interface{}, error)
}

type User interface {
	SignIn(*gin.Context) (interface{}, error)
	SignUp(*gin.Context) (string, error)
	Authorization(*gin.Context) (interface{}, error)
}

type Configurator interface {
	AddToConfiguration(*gin.Context) (interface{}, error)
	RemoveFromConfiguration(*gin.Context) (interface{}, error)
	GetConfigurationComponents(*gin.Context) (interface{}, error)
	GetUserConfiguration(*gin.Context) (interface{}, error)
}

type Service struct {
	Component
	User
	Configurator
}

func NewService(r *repository.Repository) *Service {
	return &Service{
		Component:    NewComponentService(r),
		User:         NewUserService(r),
		Configurator: NewConfiguratorService(r),
	}
}
