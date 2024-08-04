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

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var secretKey = []byte("my-hard-secret-key")

// func FindOne(db *mongo.Database, collectionName string, filter bson.D, result reflect.Value) (interface{}, error) {
// 	jsonFilter, _ := bson.MarshalExtJSON(filter, true, true)
// 	fmt.Println("FILTER:", string(jsonFilter))

// 	res := db.Collection(collectionName).FindOne(context.TODO(), filter)
// 	if err := res.Err(); err != nil {
// 		if err == mongo.ErrNoDocuments {
// 			return nil, nil
// 		}
// 		return nil, err
// 	}

// 	if err := res.Decode(result.Addr().Interface()); err != nil {
// 		return nil, err
// 	}

// 	fmt.Printf("RESULT: %+v\n", result.Interface())

//		return result.Interface(), nil
//	}
func FindOne(db *mongo.Database, collectionName string, filter bson.D, result interface{}) (interface{}, error) {
	jsonFilter, _ := bson.MarshalExtJSON(filter, true, true)
	fmt.Println("FILTER:", string(jsonFilter))

	res := db.Collection(collectionName).FindOne(context.TODO(), filter)
	if err := res.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	if err := res.Decode(result); err != nil {
		return nil, err
	}

	fmt.Printf("RESULT: %+v\n", result)

	return result, nil
}

func FindAll(db *mongo.Database, collectionName string, filter bson.D, result interface{}) ([]interface{}, error) {
	jsonFilter, _ := bson.MarshalExtJSON(filter, true, true)
	fmt.Println("FILTER: ", string(jsonFilter))

	cursor, err := db.Collection(collectionName).Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var results []interface{}
	for cursor.Next(context.Background()) {
		result := reflect.New(reflect.TypeOf(result).Elem()).Interface()
		if err := cursor.Decode(result); err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return results, nil
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

func UpdateByID(db *mongo.Database, collectionName string, id interface{}, data interface{}) (*mongo.UpdateResult, error) {
	collection := db.Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.UpdateByID(ctx, id, data)
	if err != nil {
		fmt.Println("ОШИБКА ", err)
		return nil, err
	}

	fmt.Printf("\n\nUPDATE: %+v", result)

	return result, nil
}

func GetTypeComponent(componentType string) (interface{}, error) {
	switch componentType {
	case "processor":
		return &entity.Processor{}, nil
	case "motherboard":
		return &entity.Motherboard{}, nil
	case "cooler":
		return &entity.Cooler{}, nil
	case "ram":
		return &entity.Ram{}, nil
	case "hdd":
		return &entity.Hdd{}, nil
	case "videocard":
		return &entity.Videocard{}, nil
	case "ssd":
		return &entity.Ssd{}, nil
	case "powersupply":
		return &entity.Powersupply{}, nil
	case "case":
		return &entity.Case{}, nil

	default:
		return nil, errors.New("неверный тип компонента")
	}
}

func GetStruct(strct interface{}) (reflect.Type, error) {
	currentStrct := reflect.TypeOf(strct)
	if currentStrct.Kind() != reflect.Struct {
		return nil, errors.New("не удалось определить тип структуры")
	}
	return currentStrct, nil
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

func CreateToken(user entity.User) (string, int64, int64, error) {
	createTime := time.Now().Unix()
	endTime := time.Now().Add(24 * time.Hour).Unix()

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		// "sub": id
		"login": user.Login,
		"exp":   endTime,
		"iat":   createTime,
	})

	tokenString, err := claims.SignedString(secretKey)
	if err != nil {
		return "", 0, 0, errors.New("ошибка создания токена")
	}

	return tokenString, createTime, endTime, nil
}

func ParseToken(token string) (string, int64, int64, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return "", 0, 0, err
	}

	if !parsedToken.Valid {
		return "", 0, 0, errors.New("invalid token")
	}

	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		login, okLogin := claims["login"].(string)
		exp, okExp := claims["exp"].(float64)
		iat, okIat := claims["iat"].(float64)

		if !okLogin || !okExp || !okIat {
			return "", 0, 0, errors.New("error extracting claims")
		}

		return login, int64(exp), int64(iat), nil
	}

	return "", 0, 0, errors.New("invalid token claims")

}

// func isArray(value interface{}) bool {
// 	v := reflect.ValueOf(value)
// 	kind := v.Kind()
// 	return kind == reflect.Array || kind == reflect.Slice
// }
