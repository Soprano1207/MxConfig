package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID              primitive.ObjectID            `json:"_id" bson:"_id,omitempty"`
	Email           string                        `json:"email"`
	Login           string                        `json:"login"`
	Password        string                        `json:"password"`
	Confirmpassword string                        `json:"confirmpassword"`
	Firstname       string                        `json:"firstname"`
	Lastname        string                        `json:"lastname"`
	Token           interface{}                   `json:"token"`
	Img             string                        `json:"img"`
	Configurations  map[string]primitive.ObjectID `json:"configurations"`
}
