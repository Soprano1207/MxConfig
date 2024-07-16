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
		}

		configurator := api.Group("/configurator")
		{
			configurator.POST("/add", h.Add)

			configurator.GET("/:type", h.GetConfigurationComponents)
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
