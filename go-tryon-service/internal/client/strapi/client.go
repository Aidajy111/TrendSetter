package strapi

type Client struct {
	baseURL string
}

func NewClient(baseURL string) *Client {
	return &Client{
		baseURL: baseURL,
	}
}

// GetProductData — метод, который реализует интерфейс service.StrapiClient
// Он идет в базу и узнает детали товара
func (c *Client) GetProductData(productID string) (string, string, error) {
	// В будущем здесь будет реальный HTTP GET-запрос:
	// url := fmt.Sprintf("%s/api/products/%s?populate=*", c.baseURL, productID)
	// resp, err := http.Get(url)

	// А пока возвращаем заглушки (mock-данные)
	fakeImageURL := "https://trendsetter.ru/uploads/fake-hoodie.png"
	fakeDesc := "красное оверсайз худи с белыми надписями, плотный хлопок"

	return fakeImageURL, fakeDesc, nil
}
