DEV_COMPOSE=docker-compose.dev.yml
C=

all: env

env:
	@echo "Setting up env var.."
	@echo "Run 'make dev' to run as development mode and 'make prod' for production mode"
	@echo "Open Makefile or readme.md for more details"
	@cp ./server/.env.example ./server/.env

dev_build:
	docker-compose -f $(DEV_COMPOSE) build

dev_up:
	docker-compose -f $(DEV_COMPOSE) up -d

dev:
	@cp ./server/.env.example ./server/.env
	cd ./server/ && npm i
	cd ./client/ && npm i
	make dev_build
	make dev_up

down:
	docker-compose down

down_clean:
	docker-compose down -v

prod_build:
	docker-compose build

prod_up:
	docker-compose up -d

prod:
	make
	make prod_build
	make prod_up

logs:
	docker-compose logs -f $(C)

dev_select:
	docker-compose -f $(DEV_COMPOSE) up -d $(C)