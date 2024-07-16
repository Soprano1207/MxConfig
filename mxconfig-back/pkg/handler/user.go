package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) SignIn(gc *gin.Context) {

	result, err := h.service.SignIn(gc)

	response := gin.H{"status": "ok", "data": result}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}

func (h *Handler) SignUp(gc *gin.Context) {

	result, err := h.service.SignUp(gc)

	response := gin.H{"status": "ok", "data": result}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}
