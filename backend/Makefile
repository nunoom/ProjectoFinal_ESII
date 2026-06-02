SHELL := /bin/bash

SERVICES := api-gateway auth-service user-service content-service \
            quiz-service gamification-service forum-service \
            notification-service backoffice-service

COMPOSE  := docker-compose
MVN      := mvn

.PHONY: build up down restart logs ps test clean db-migrate swagger seed lint help \
        status health

## ─────────────────────────────────────────────────────────────────────────────
## Build & Run
## ─────────────────────────────────────────────────────────────────────────────

build: ## Build all services with Maven (parallel, skip tests)
	$(MVN) -T 1C -DskipTests clean package

build-service: ## Build a single service: make build-service S=auth-service
	$(MVN) -T 1C -DskipTests clean package -pl $(S)

up: ## Start all services and infra (docker-compose up --build -d)
	$(COMPOSE) up --build -d

down: ## Stop all services (docker-compose down)
	$(COMPOSE) down

down-v: ## Stop all services AND remove volumes
	$(COMPOSE) down -v

restart: down up ## Stop then start all services

## ─────────────────────────────────────────────────────────────────────────────
## Monitoring
## ─────────────────────────────────────────────────────────────────────────────

logs: ## Follow logs for all services
	$(COMPOSE) logs -f

logs-service: ## Follow logs for a single service: make logs-service S=auth-service
	$(COMPOSE) logs -f $(S)

ps: ## Show running containers
	$(COMPOSE) ps

status: ## Show status of each service health endpoint
	@for s in $(SERVICES); do \
	  echo "--- $$s ---"; \
	  port=$$($(COMPOSE) port $$s 808x 2>/dev/null || echo "?"); \
	  echo "  port: $$port"; \
	done

health: ## Check /actuator/health on all services
	@curl -s http://localhost:8081/actuator/health | jq .status || true
	@curl -s http://localhost:8082/actuator/health | jq .status || true
	@curl -s http://localhost:8083/actuator/health | jq .status || true
	@curl -s http://localhost:8084/actuator/health | jq .status || true
	@curl -s http://localhost:8085/actuator/health | jq .status || true
	@curl -s http://localhost:8086/actuator/health | jq .status || true
	@curl -s http://localhost:8087/actuator/health | jq .status || true
	@curl -s http://localhost:8088/actuator/health | jq .status || true

## ─────────────────────────────────────────────────────────────────────────────
## Testing
## ─────────────────────────────────────────────────────────────────────────────

test: ## Run all unit + integration tests
	$(MVN) test

test-service: ## Test a single service: make test-service S=auth-service
	$(MVN) test -pl $(S)

## ─────────────────────────────────────────────────────────────────────────────
## Maintenance
## ─────────────────────────────────────────────────────────────────────────────

clean: ## Remove all Maven build artifacts
	$(MVN) clean

db-migrate: ## Run Flyway migrations on all services
	$(MVN) -pl auth-service,user-service,content-service,quiz-service,\
gamification-service,forum-service,notification-service,backoffice-service \
	flyway:migrate

swagger: ## Open Swagger UI for api-gateway in browser
	@echo "Opening Swagger UI..."
	@open http://localhost:8080/swagger-ui.html 2>/dev/null || \
	 xdg-open http://localhost:8080/swagger-ui.html 2>/dev/null || \
	 echo "Open http://localhost:8080/swagger-ui.html in your browser"

swagger-auth: ## Open Swagger UI for auth-service
	@open http://localhost:8081/swagger-ui.html 2>/dev/null || echo "http://localhost:8081/swagger-ui.html"

swagger-quiz: ## Open Swagger UI for quiz-service
	@open http://localhost:8084/swagger-ui.html 2>/dev/null || echo "http://localhost:8084/swagger-ui.html"

seed: ## Run data seeders (already embedded in Flyway V1 migrations)
	@echo "Seed data is embedded in Flyway migrations (V1__init.sql per service)."
	@echo "To re-apply: make db-migrate"

lint: ## Run Checkstyle
	$(MVN) -DskipTests checkstyle:check

env: ## Copy .env.example to .env if not present
	@[ -f .env ] && echo ".env already exists" || (cp .env.example .env && echo "Created .env from .env.example — fill in secrets!")

## ─────────────────────────────────────────────────────────────────────────────
## Help
## ─────────────────────────────────────────────────────────────────────────────

help: ## List all available targets with descriptions
	@echo ""
	@echo "EHA Backend — Available Makefile targets:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
