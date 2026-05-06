package transport

import (
	"github.com/Aidajy111/TrendSetter/internal/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	tryonService *service.TryOnService
}

func NewHandler(tryonService *service.TryOnService) *Handler {
	return &Handler{
		tryonService: tryonService,
	}
}

func (s *Handler) CreateImage(c *gin.Context) {
	// 1. Парсим входные данные (фото пользователя, product_id, user_id, промпт для генерации)
	// 2. Вызываем метод ProcessTryOn сервиса для генерации изображения
	// 3. Возвращаем клиенту URL сгенерированного изображения
}
