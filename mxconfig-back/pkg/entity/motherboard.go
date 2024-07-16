package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Motherboard struct {
	ID         primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name       string             `json:"name" binding:"required"`
	Brand      string             `json:"brand" binding:"required"`
	Socket     string             `json:"socket"`
	Formfactor string             `json:"formfactor"`
	Chipset    string             `json:"chipset"`
	Img        string             `json:"img"`
	Price      []int32            `json:"price"`
}
