package repository

import (
	"mxconfig-back/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ConfiguratorMongoDB struct {
	db *mongo.Database
}

func NewConfiguratorMongoDB(db *mongo.Database) *ConfiguratorMongoDB {
	return &ConfiguratorMongoDB{db: db}
}

func (r *ConfiguratorMongoDB) FindAll(collectionName string, filter bson.D, result interface{}) (interface{}, error) {
	return utils.FindAll(r.db, collectionName, filter, result)
}

//	func (r *ConfiguratorMongoDB) FindOne(collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
//		return utils.FindOne(r.db, collectionName, filter, result)
//	}
func (r *ConfiguratorMongoDB) FindOne(collectionName string, filter bson.D, result interface{}) (interface{}, error) {
	return utils.FindOne(r.db, collectionName, filter, result)
}

func (r *ConfiguratorMongoDB) InsertOne(collectionName string, document interface{}) (*mongo.InsertOneResult, error) {
	return utils.InsertOne(r.db, collectionName, document)
}

func (r *ConfiguratorMongoDB) UpdateByID(collectionName string, id interface{}, data interface{}) (*mongo.UpdateResult, error) {
	return utils.UpdateByID(r.db, collectionName, id, data)
}
