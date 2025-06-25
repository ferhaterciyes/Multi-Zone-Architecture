# Makefile for Micro-Frontend E-Commerce App

.PHONY: help install dev build docker-build docker-up docker-down clean

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies for both apps
	@echo "Installing dependencies..."
	cd home && npm install
	cd cart && npm install
	@echo "✅ Dependencies installed!"

dev: ## Start both applications in development mode
	@echo "Starting development servers..."
	@echo "🏠 Home app will start on http://localhost:3000"
	@echo "🛒 Cart app will start on http://localhost:3001"
	@echo "Opening terminals for each app..."
	osascript -e 'tell app "Terminal" to do script "cd $(PWD)/home && npm run dev"'
	osascript -e 'tell app "Terminal" to do script "cd $(PWD)/cart && npm run dev"'

build: ## Build both applications
	@echo "Building applications..."
	cd home && npm run build
	cd cart && npm run build
	@echo "✅ Build completed!"

docker-build: ## Build Docker images
	@echo "Building Docker images..."
	docker-compose build
	@echo "✅ Docker images built!"

docker-up: ## Start applications with Docker
	@echo "Starting applications with Docker..."
	docker-compose up --build
	@echo "✅ Applications started!"
	@echo "🏠 Home: http://localhost:3000"
	@echo "🛒 Cart: http://localhost:3001"

docker-up-bg: ## Start applications with Docker in background
	@echo "Starting applications with Docker in background..."
	docker-compose up -d --build
	@echo "✅ Applications started in background!"
	@echo "🏠 Home: http://localhost:3000"
	@echo "🛒 Cart: http://localhost:3001"

docker-down: ## Stop Docker containers
	@echo "Stopping Docker containers..."
	docker-compose down
	@echo "✅ Containers stopped!"

docker-logs: ## Show Docker logs
	docker-compose logs -f

clean: ## Clean node_modules and build artifacts
	@echo "Cleaning up..."
	rm -rf home/node_modules home/.next
	rm -rf cart/node_modules cart/.next
	docker-compose down -v
	docker system prune -f
	@echo "✅ Cleanup completed!"

status: ## Show running processes
	@echo "Checking running processes..."
	@lsof -i :3000 || echo "Port 3000: Not in use"
	@lsof -i :3001 || echo "Port 3001: Not in use"
	@docker-compose ps
