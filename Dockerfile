FROM node:lts-alpine

# Prisma'nın çalışması için gerekli kütüphane
RUN apk add --no-cache openssl

WORKDIR /app

# Önce bağımlılıkları ve prisma şemasını kopyala
COPY package*.json ./
COPY prisma ./prisma/

# Bağımlılıkları yükle ve Prisma istemcisini oluştur
RUN npm ci
RUN npx prisma generate

# Sonra kaynak kodları kopyala
COPY . .

EXPOSE 8080