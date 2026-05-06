package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Aidajy111/TrendSetter/internal/client/genapi"
	"github.com/Aidajy111/TrendSetter/internal/client/strapi"
	"github.com/Aidajy111/TrendSetter/internal/server"
	"github.com/Aidajy111/TrendSetter/internal/service"
	"github.com/Aidajy111/TrendSetter/internal/transport"
	"github.com/gin-gonic/gin"
)

func main() {
	// Создаем базовый роутер (маршрутизатор) Gin
	r := gin.Default()

	// Читаем секретный ключ для JWT из переменных окружения (для Docker), либо ставим дефолтный ключ для локальной разработки
	secretKey := os.Getenv("JWT_SECRET")
	if secretKey == "" {
		secretKey = "super-puper-secret-key-trenssetter"
	}

	// Читаем порт из переменных окружения (для Docker), либо ставим 2222 локально
	port := os.Getenv("PORT")
	if port == "" {
		port = "2222"
	}

	// Читаем ключи как строки из флагов
	genApiKey := flag.String("gen_api_key", "", "API-key from GenApi, which you can use to generate")
	s3Client := flag.String("s3_endpoint", "", "S3 endpoint for file storage")
	strapiURL := flag.String("strapi_url", "http://localhost:1337", "Base URL for Strapi CMS")
	flag.Parse()

	getClient := genapi.NewClient(*genApiKey)
	// s3ClientObj := s3.NewClient(*s3Endpoint) // Сделаешь по аналогии
	strapiClientObj := strapi.NewClient(*strapiURL)

	service := service.NewTryOnService(getClient, nil, strapiClientObj)
	srv := server.NewServer(r, port)
	handler := transport.NewHandler(service)

	r.POST("/api/try-on", handler.CreateImage)

	// канал для gracefil shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	log.Printf("Микросервис примерки запускается на http://localhost:%s", port)

	// Запускаем сервер

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Ошибка запуска сервера %v", err)
		}
	}()

	// gracefil shutdown
	<-stop
	log.Println("Микросервис примерки останавливается...")
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Ошибка при остановке сервера: %v", err)
	}
	log.Println("Сервер остановлен!!!...")
}
