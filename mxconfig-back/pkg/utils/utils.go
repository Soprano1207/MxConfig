package utils

import (
	"context"
	"errors"
	"fmt"
	"mxconfig-back/pkg/entity"
	"net/url"
	"reflect"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func FindOne(db *mongo.Database, collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
	jsonFilter, _ := bson.MarshalExtJSON(filter, true, true)
	fmt.Println("FILTER:", string(jsonFilter))

	res := db.Collection(collectionName).FindOne(context.TODO(), filter)
	if err := res.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	if err := res.Decode(result.Addr().Interface()); err != nil {
		return nil, err
	}

	return result.Interface(), nil
}

func FindAll(db *mongo.Database, collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
	jsonFilter, _ := bson.MarshalExtJSON(filter, true, true)
	fmt.Println("FILTER: ", string(jsonFilter))

	cursor, err := db.Collection(collectionName).Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	if err = cursor.All(context.TODO(), result.Addr().Interface()); err != nil {
		return nil, err
	}

	fmt.Printf("RESULTS: %+v\n", result.Interface())

	return result.Interface(), nil
}

func InsertOne(db *mongo.Database, collectionName string, document interface{}) (*mongo.InsertOneResult, error) {
	collection := db.Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctx, document)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func GetTypeComponent(componentType string) (interface{}, error) {
	var component interface{}

	switch componentType {
	case "processor":
		component = entity.Processor{}
	case "motherboard":
		component = entity.Motherboard{}
	case "filter_processor":
		component = entity.Filter_Processor{}
	case "filter_motherboard":
		component = entity.Filter_Motherboard{}
	default:
		return nil, errors.New("неверный тип компонента")
	}

	return component, nil
}

func GetStructCompnent(componentType interface{}) (reflect.Type, error) {
	componentStruct := reflect.TypeOf(componentType)
	if componentStruct.Kind() != reflect.Struct {
		return nil, errors.New("не удалось определить тип компонента")
	}
	return componentStruct, nil
}

func ParseQuery(params url.Values) map[string][]interface{} {
	m := make(map[string][]interface{})

	for key, values := range params {
		index := strings.Index(key, "[")
		if index != -1 {
			key = key[:index]
		}

		if _, ok := m[key]; !ok {
			m[key] = []interface{}{}
		}

		for _, v := range values {
			m[key] = append(m[key], v)
		}
	}

	return m
}

func FirstLower(str string) string {
	return strings.ToLower(str[:1]) + str[1:]
}

func FirstUpper(str string) string {
	return strings.ToUpper(str[:1]) + str[1:]
}

// func isArray(value interface{}) bool {
// 	v := reflect.ValueOf(value)
// 	kind := v.Kind()
// 	return kind == reflect.Array || kind == reflect.Slice
// }
