package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Token struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Token   string             `json:"token"`
	EndTime int                `json:"endTime"`
	Create  int                `json:"create"`
}
