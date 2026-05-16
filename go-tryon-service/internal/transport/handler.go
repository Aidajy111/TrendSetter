package transport

import (
	"net/http"

	"github.com/Aidajy111/TrendSetter/internal/service"
	"github.com/gin-gonic/gin"
)

const maxUserImageBytes = 10 << 20 // 10 MiB

type Handler struct {
	tryonService *service.TryOnService
}

func NewHandler(tryonService *service.TryOnService) *Handler {
	return &Handler{
		tryonService: tryonService,
	}
}

// CreateImage принимает multipart/form-data: user_image, product_id, prompt (опционально).
// Authorization: Bearer <JWT> - проверяется middleware Auth.
func (h *Handler) CreateImage(c *gin.Context) {
	userID := c.GetString("userID")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	productID := c.PostForm("product_id")
	if productID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "product_id is required",
		})
		return
	}

	userPrompt := c.PostForm("prompt")

	fileHeader, err := c.FormFile("user_image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "user_image is required",
		})
		return
	}

	if fileHeader.Size > maxUserImageBytes {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "user_image is too large",
		})
		return
	}

	userImage, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read user_image",
		})
		return
	}
	defer userImage.Close()

	resultURL, err := h.tryonService.ProcessTryOn(userImage, userPrompt, productID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":     "success",
		"result_url": resultURL,
	})
}
