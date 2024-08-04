package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Powersupply struct {
	ID    primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name  string             `json:"name" binding:"required"`
	Brand string             `json:"brand" binding:"required"`
	Power int32              `json:"power"`
	Img   string             `json:"img"`
	Price []int32            `json:"price"`
}
