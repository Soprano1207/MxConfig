package repository

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Config struct {
	HOST     string
	PORT     string
	DATABASE string
}

func NewMongoDB(ctx context.Context, cfg Config) (db *mongo.Database, err error) {
	mongoDBURL := fmt.Sprintf("mongodb://%s:%s", cfg.HOST, cfg.PORT)
	fmt.Println(mongoDBURL)

	clientOptions := options.Client().ApplyURI(mongoDBURL)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}

	return client.Database(cfg.DATABASE), nil
}
