package main

import (
	"context"
	"log"
	"mxconfig-back/pkg/handler"
	"mxconfig-back/pkg/repository"
	"mxconfig-back/pkg/service"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db, err := repository.NewMongoDB(context.Background(), repository.Config{
		HOST:     "127.0.0.1",
		PORT:     "27017",
		DATABASE: "config",
	})

	if err != nil {
		log.Fatalf("Ошибка подключения к БД %s", err.Error())
	}

	repository := repository.NewRepository(db)
	service := service.NewService(repository)
	handler := handler.NewHandler(service)

	r := gin.Default()
	// Настройка CORS

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Разрешенные источники
		AllowMethods:     []string{"GET", "POST", "PUT", "OPTIONS", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	handler.InitRoutes(r)
	// r.GET("/ping", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "pong",
	// 	})
	// })

}
