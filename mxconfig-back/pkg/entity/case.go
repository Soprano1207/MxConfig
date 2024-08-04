package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Case struct {
	ID         primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name       string             `json:"name" binding:"required"`
	Brand      string             `json:"brand" binding:"required"`
	Formfactor string             `json:"formfactor"`
	Img        string             `json:"img"`
	Price      []int32            `json:"price"`
}
