package repository

import (
	"mxconfig-back/pkg/utils"
	"reflect"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var database *mongo.Database

type Components interface {
	CreateComponent(*interface{})
	// GetFilterComponents(string, reflect.Value) (interface{}, error)
	FindAll(string, bson.D, reflect.Value) (interface{}, error)
}

type User interface {
	FindAll(string, bson.D, reflect.Value) (interface{}, error)
	FindOne(string, bson.D, reflect.Value) (interface{}, error)
	InsertOne(string, interface{}) (*mongo.InsertOneResult, error)
}

type Configurator interface {
	FindAll(string, bson.D, reflect.Value) (interface{}, error)
	FindOne(string, bson.D, reflect.Value) (interface{}, error)
	InsertOne(string, interface{}) (*mongo.InsertOneResult, error)
}

type Repository struct {
	Components
	User
	Configurator
}

func NewRepository(db *mongo.Database) *Repository {
	database = db
	return &Repository{
		Components:   NewComponentsMongoDB(db),
		User:         NewUserMongoDB(db),
		Configurator: NewConfiguratorMongoDB(db),
	}
}

func (r *Repository) FindOne(collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
	return utils.FindOne(database, collectionName, filter, result)
}

func (r *Repository) FindAll(collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
	return utils.FindAll(database, collectionName, filter, result)
}

func (r *Repository) InsertOne(collectionName string, document interface{}) (*mongo.InsertOneResult, error) {
	return utils.InsertOne(database, collectionName, document)
}