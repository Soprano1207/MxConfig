package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) AddToConfiguration(gc *gin.Context) {

	result, err := h.service.AddToConfiguration(gc)

	response := gin.H{"status": "ok", "data": result}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}

func (h *Handler) RemoveFromConfiguration(gc *gin.Context) {

	result, err := h.service.RemoveFromConfiguration(gc)

	response := gin.H{"status": "ok", "data": result}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}

func (h *Handler) GetConfigurationComponents(gc *gin.Context) {
	result, err := h.service.GetConfigurationComponents(gc)

	response := gin.H{"status": "ok", "data": result}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}

func (h *Handler) GetUserConfiguration(gc *gin.Context) {
	result, err := h.service.GetUserConfiguration(gc)

	response := gin.H{"status": "ok", "data": result}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}
