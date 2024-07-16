package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Processor struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name      string             `json:"name" binding:"required"`
	Brand     string             `json:"brand" binding:"required"`
	Core      string             `json:"core"`
	Socket    string             `json:"socket"`
	Countcore int32              `json:"countcore"`
	Tdp       int32              `json:"tdp"`
	Gpu       string             `json:"gpu"`
	Year      int32              `json:"year"`
	Img       string             `json:"img"`
	Price     []int32            `json:"price"`
}
