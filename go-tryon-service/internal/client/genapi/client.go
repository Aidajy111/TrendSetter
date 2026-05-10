package genapi

import "mime/multipart"

// Client - это конкретная реализация клиента для GenAPI
type Client struct {
	apiKey string // Ключ хранится здесь внутри клиента
}

func NewClient(apiKey string) *Client {
	return &Client{
		apiKey: apiKey,
	}
}

// GenerateImage — этот метод заставляет наш Client соответствовать интерфейсу service.GenAPIClient
func (c *Client) GenerateImage(imageUser multipart.File, imageProduct string, prompt string) ([]byte, error) {
	// Здесь в будущем ты напишешь реальный HTTP-запрос к серверу GenAPI
	// И сможешь прикрепить ключ вот так: req.Header.Add("Authorization", "Bearer " + c.apiKey)

	return []byte("fake image data"), nil
}
