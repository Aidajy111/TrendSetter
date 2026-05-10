package s3

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
func (c *Client) UploadResult(imageBytes []byte, userID string) (string, error) {
	// Здесь в будущем ты напишешь реальный HTTP-запрос к серверу GenAPI
	// И сможешь прикрепить ключ вот так: req.Header.Add("Authorization", "Bearer " + c.apiKey)

	return "", nil
}
