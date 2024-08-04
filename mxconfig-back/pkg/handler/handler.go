package handler

import (
	"mxconfig-back/pkg/service"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *service.Service
}

func NewHandler(s *service.Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) InitRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{

		api.GET("/filter/:type", h.GetFilterComponents)

		user := api.Group("/user")
		{
			user.POST("/signin", h.SignIn)
			user.POST("/signup", h.SignUp)
			user.GET("/authorization", h.Authorization)
		}

		configurator := api.Group("/configurator")
		{
			configurator.POST("/addToConfiguration", h.AddToConfiguration)
			configurator.POST("/removeFromConfiguration", h.RemoveFromConfiguration)
			configurator.GET("/:type", h.GetConfigurationComponents)
			configurator.GET("/getUserConfiguration", h.GetUserConfiguration)
		}

		components := api.Group("/components")
		{
			components.GET("/", h.GetComponents)
			components.GET("/:type", h.GetComponents)
			// components.GET("/:id", h.GetComponentsById)
			components.PUT("/:id", h.UpdateComponent)
			components.POST("/", h.CreateComponent)

		}
	}

	router.Static("/images", "./assets/images")

	router.Run()
}
