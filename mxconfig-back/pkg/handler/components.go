package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetFilterComponents(gc *gin.Context) {
	filters, err := h.service.GetFilterComponents(gc)

	response := gin.H{"status": "ok", "data": filters}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}

func (h *Handler) GetComponents(gc *gin.Context) {
	components, err := h.service.GetComponents(gc)

	response := gin.H{"status": "ok", "data": components}
	if err != nil {
		response = gin.H{"status": "error", "message": err.Error()}
	}
	gc.JSON(http.StatusOK, response)
}

func (h *Handler) GetComponentsById(gc *gin.Context) {

	gc.JSON(http.StatusOK, gin.H{
		"message": "getComponentsById",
	})
}

func (h *Handler) CreateComponent(gc *gin.Context) {
	// var input entity.Component

	// if err := gc.BindJSON(&input); err != nil {
	// 	gc.JSON(http.StatusBadRequest, gin.H{
	// 		"handle":  "createComponent",
	// 		"message": err.Error(),
	// 	})
	// 	return
	// }

	// h.service.Component.CreateComponent(&input)

	// gc.JSON(http.StatusOK, gin.H{
	// 	"message": "createComponent",
	// })

}

func (h *Handler) UpdateComponent(gc *gin.Context) {
	// var input entity.Component

	// if err := gc.BindJSON(&input); err != nil {
	// 	gc.JSON(http.StatusBadRequest, gin.H{
	// 		"handle":  "updateComponent",
	// 		"message": err.Error(),
	// 	})
	// 	return
	// }

	// gc.JSON(http.StatusOK, gin.H{
	// 	"message": "updateComponent",
	// })

}
