# Используем стабильную версию Node.js на базе Alpine для легкости
FROM node:18-alpine

# Устанавливаем системные зависимости для Strapi (нужны для сборки sharp и работы с БД)
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

# Устанавливаем рабочую директорию
WORKDIR /opt/

# Копируем конфиги зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
WORKDIR /opt/app
COPY . .

# Собираем админ-панель
RUN npm run build

# Пробрасываем стандартный порт Strapi
EXPOSE 1337

# Запускаем в режиме продакшн или разработки (зависит от NODE_ENV в .env)
CMD ["npm", "run", "develop"]