package repository

import (
	"mxconfig-back/pkg/utils"
	"reflect"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserMongoDB struct {
	db *mongo.Database
}

func NewUserMongoDB(db *mongo.Database) *UserMongoDB {
	return &UserMongoDB{db: db}
}

func (r *UserMongoDB) FindAll(collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
	return utils.FindAll(r.db, collectionName, filter, result)
}

func (r *UserMongoDB) FindOne(collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
	return utils.FindOne(r.db, collectionName, filter, result)
}

func (r *UserMongoDB) InsertOne(collectionName string, document interface{}) (*mongo.InsertOneResult, error) {
	return utils.InsertOne(r.db, collectionName, document)
}
