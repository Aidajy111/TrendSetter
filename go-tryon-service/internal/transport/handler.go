package transport

import (
	"net/http"

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
	// =====================================================================
	// ОЖИДАЕМЫЙ ЗАПРОС ОТ ФРОНТЕНДА:
	// Формат: multipart/form-data (не JSON!)
	// Заголовки (Headers):
	//   Authorization: Bearer <JWT_TOKEN_ПОЛЬЗОВАТЕЛЯ>
	//
	// Тело (Body):
	//   user_image: [Бинарный файл картинки .jpg/.png]
	//   product_id: "1234" (ID товара из базы Strapi)
	//   prompt: "на фоне неонового ночного города в стиле киберпанк" (опционально)
	//
	// ЧЕГО ТУТ НЕТ И НЕ ДОЛЖНО БЫТЬ:
	// - user_id (Его фронт не шлет напрямую. Мы сами достанем user_id из JWT-токена для безопасности)
	// - count (Баланс проверяется на бэкенде через Strapi, фронтенду мы не доверяем)
	// =====================================================================

	// 1. ПРОВЕРКА АВТОРИЗАЦИИ (MiddleWare)
	// Предполагается, что до входа в эту функцию отработал middleware Gin,
	// который проверил JWT токен и положил ID пользователя в контекст.
	// userID := c.GetString("userID")

	// 2. ПАРСИНГ ВХОДНЫХ ДАННЫХ
	// productID := c.PostForm("product_id")
	// userPrompt := c.PostForm("prompt") // Если пусто - ничего страшного, сервис подставит дефолтный
	// userImage, err := c.FormFile("user_image")

	// 3. ВАЛИДАЦИЯ
	// Проверяем, что картинка и product_id точно пришли. Если нет - отбиваем ошибку 400.

	// 4. ПЕРЕДАЧА В SERVICE (Слой бизнес-логики)
	// resultURL, err := h.tryonService.ProcessTryOn(userImage, userPrompt, productID, userID)

	// 5. ОТВЕТ ФРОНТЕНДУ (Возвращаем URL готовой картинки)
	// c.JSON(http.StatusOK, gin.H{
	// 	"status": "success",
	// 	"result_url": resultURL,
	// })

	productId := c.PostForm("product_id")
	userPrompt := c.PostForm("prompt")
	userImage, err := c.FormFile("user_image")
	if err != nil {
		return err.Error(err)
	}

	test := c.Request.Body.Read()

	imagrUrl, err := s.tryonService.ProcessTryOn()

	resultURL := ""

	c.JSON(http.StatusOK, gin.H{
		"status":     "success",
		"result_url": resultURL,
	})
}
