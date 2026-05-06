package service

import "mime/multipart"

type StrapiClient interface {
	GetProductData(productId string) (imageUrl string, desc string, err error)
}

// Загружает готовые байты в Яндекс.Облако и возвращает публичную ссылку
type S3Client interface {
	UploadResult(imageBytes []byte, userID string) (string, error)
}

// Отправляет фото юзера, фото одежды и промпт в нейросеть, возвращает готовые байты картинки
type GenAPIClient interface {
	GenerateImage(imageUser multipart.File, imageProduct string, prompt string) ([]byte, error)
}

type TryOnService struct {
	genapiClient GenAPIClient
	s3Client     S3Client
	strapiClient StrapiClient
}

func NewTryOnService(genapiClient GenAPIClient, s3Client S3Client, strapiClient StrapiClient) *TryOnService {
	return &TryOnService{
		genapiClient: genapiClient,
		s3Client:     s3Client,
		strapiClient: strapiClient,
	}
}

func (s *TryOnService) ProcessTryOn(imageUser multipart.File, prompt string, productID, userID string) (string, error) {
	// 1. Получаем 2 картинки и промпт для генерации от GenAPI
	// 2. Вызываем GenAPI для генерации изображения
	// 3. Сохраняем сгенерированное изображение в S3 и получаем URL
	// 4. Возвращаем URL клиенту
	return "", nil
}
