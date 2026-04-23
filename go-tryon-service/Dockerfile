# Этап 1: Сборка (Build)
FROM golang:1.25.3 AS builder

WORKDIR /app

# Копируем файлы зависимостей и скачиваем их
COPY go.mod go.sum ./
RUN go mod download

# Копируем весь остальной код
COPY . .

# Компилируем приложение в один бинарный файл "main"
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/main.go

# Этап 2: Финальный легкий образ
FROM alpine:latest

WORKDIR /app

# Копируем скомпилированный бинарник из первого этапа
COPY --from=builder /app/main .
COPY --from=builder /app/.env . 

# Открываем порт, который слушает Gin
EXPOSE 2222

# Запускаем бинарник
CMD ["./main"]