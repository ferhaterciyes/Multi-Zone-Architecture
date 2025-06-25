# Home Dockerfile
FROM node:18-alpine

WORKDIR /app

# Package.json ve package-lock.json kopyala
COPY package*.json ./

# Tüm dependencies yükle (dev dependencies dahil)
RUN npm install

# Uygulama kodlarını kopyala
COPY . .

# Port 3000'i expose et
EXPOSE 3000

# Development modunda çalıştır
CMD ["npm", "run", "dev"]
