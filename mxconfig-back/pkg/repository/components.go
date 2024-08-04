package repository

import (
	"fmt"
	"mxconfig-back/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ComponentsMongoDB struct {
	db *mongo.Database
}

func NewComponentsMongoDB(db *mongo.Database) *ComponentsMongoDB {
	return &ComponentsMongoDB{db: db}
}

// ФИЛЬТР
// func (r *ComponentsMongoDB) GetFilterComponents(collectionName string, result reflect.Value) (interface{}, error) {
// 	filter := bson.D{{}}

// 	cursor, err := r.db.Collection(collectionName).Find(context.TODO(), filter)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if err = cursor.All(context.TODO(), result.Addr().Interface()); err != nil {
// 		return nil, err
// 	}

// 	fmt.Printf("Results: %+v\n", result.Interface())

// 	return result.Interface(), nil
// }

// REST
func (r *ComponentsMongoDB) CreateComponent(st *interface{}) {
	fmt.Print(st)
}

func (r *ComponentsMongoDB) FindAll(collectionName string, filter bson.D, result interface{}) (interface{}, error) {
	return utils.FindAll(r.db, collectionName, filter, result)
}
