package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// Создаем базовый роутер (маршрутизатор) Gin
	r := gin.Default()

	// Базовый эндпоинт для проверки здоровья сервера (Healthcheck)
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "pong",
		})
	})

	// Заглушка для нашего будущего сложного функционала
	r.POST("/api/try-on", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "Привет! Я микросервис TrendSetter. Скоро здесь будет генерация одежды.",
		})
	})

	// Читаем порт из переменных окружения (для Docker), либо ставим 2222 локально
	port := os.Getenv("PORT")
	if port == "" {
		port = "2222"
	}

	log.Printf("🚀 Микросервис примерки запускается на http://localhost:%s", port)

	// Запускаем сервер
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Ошибка при запуске сервера: %v", err)
	}
}
