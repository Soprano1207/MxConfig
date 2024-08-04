package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Hdd struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name      string             `json:"name" binding:"required"`
	Brand     string             `json:"brand" binding:"required"`
	Interface string             `json:"interface"`
	Img       string             `json:"img"`
	Price     []int32            `json:"price"`
}
