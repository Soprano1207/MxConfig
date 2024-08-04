package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Ssd struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name      string             `json:"name"`
	Brand     string             `json:"brand"`
	Interface string             `json:"interface"`
	Img       string             `json:"img"`
	Price     []int32            `json:"price"`
}
