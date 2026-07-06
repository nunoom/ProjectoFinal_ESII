# Makefile — Economia com História: Angola (EHA)
# Uso: make <alvo>   (make help para ver todos os alvos)

# O backend requer Java 17 (docs). Em macOS deteta-o automaticamente;
# caso contrário usa o JAVA_HOME do ambiente.
JAVA_HOME_17 := $(shell /usr/libexec/java_home -v 17 2>/dev/null || echo "$$JAVA_HOME")
MVN := JAVA_HOME="$(JAVA_HOME_17)" mvn

.DEFAULT_GOAL := help

# ---------- Ajuda ----------

.PHONY: help
help: ## Mostra esta ajuda
	@echo "EHA — alvos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

# ---------- Instalação ----------

.PHONY: install
install: ## Instala as dependências do frontend e do mobile
	cd frontend && npm install
	cd mobile && npm install

# ---------- Base de dados ----------

.PHONY: db-up
db-up: ## Sobe o PostgreSQL 15 (Docker)
	docker compose up -d postgres

.PHONY: db-down
db-down: ## Pára o PostgreSQL
	docker compose down

# ---------- Backend ----------

.PHONY: backend
backend: ## Arranca a API em :8080 (H2 em memória, sem dependências)
	cd backend && $(MVN) spring-boot:run

.PHONY: backend-postgres
backend-postgres: ## Arranca a API com PostgreSQL (requer make db-up)
	cd backend && $(MVN) spring-boot:run -Dspring-boot.run.profiles=postgres

.PHONY: backend-test
backend-test: ## Corre os testes de integração do backend
	cd backend && $(MVN) test

.PHONY: backend-package
backend-package: ## Gera o JAR de produção do backend
	cd backend && $(MVN) -DskipTests package

# ---------- Frontend ----------

.PHONY: frontend
frontend: ## Arranca o frontend em modo dev (:3000)
	cd frontend && npm run dev

.PHONY: frontend-build
frontend-build: ## Build de produção do frontend
	cd frontend && npm run build

.PHONY: frontend-start
frontend-start: ## Serve o build de produção do frontend
	cd frontend && npm run start

# ---------- Mobile ----------

.PHONY: mobile
mobile: ## Arranca o Expo (QR code para Expo Go)
	cd mobile && npm start

.PHONY: mobile-check
mobile-check: ## Typecheck do mobile
	cd mobile && npx tsc --noEmit

# ---------- Qualidade ----------

.PHONY: test
test: backend-test frontend-build mobile-check ## Corre tudo o que o CI corre

.PHONY: clean
clean: ## Remove artefactos de build
	cd backend && $(MVN) -q clean
	rm -rf frontend/.next
