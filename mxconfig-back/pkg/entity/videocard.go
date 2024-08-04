package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Videocard struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name    string             `json:"name"`
	Brand   string             `json:"brand"`
	Chipset string             `json:"chipset"`
	Img     string             `json:"img"`
	Price   []int32            `json:"price"`
}
