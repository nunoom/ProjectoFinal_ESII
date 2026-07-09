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

# Se backend/.env existir com MAIL_HOST definido, ativa o envio real de emails
# (código de verificação) através das propriedades standard do Spring Mail.
define RUN_BACKEND
	cd backend && sh -c 'set -a; [ -f .env ] && . ./.env; set +a; \
	  if [ -n "$$MAIL_HOST" ]; then \
	    export SPRING_MAIL_HOST="$$MAIL_HOST" SPRING_MAIL_PORT="$$MAIL_PORT" \
	      SPRING_MAIL_USERNAME="$$MAIL_USERNAME" \
	      SPRING_MAIL_PASSWORD="$$(printf %s "$$MAIL_PASSWORD" | tr -d "\" ")" \
	      SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true \
	      SPRING_MAIL_PROPERTIES_MAIL_SMTP_SSL_ENABLE=true \
	      EHA_MAIL_FROM="$$MAIL_FROM_ADDRESS"; \
	  fi; \
	  JAVA_HOME="$(JAVA_HOME_17)" mvn spring-boot:run $(1)'
endef

.PHONY: backend
backend: ## Arranca a API em :8080 (H2; emails reais se backend/.env tiver MAIL_HOST)
	$(call RUN_BACKEND,)

.PHONY: backend-postgres
backend-postgres: ## Arranca a API com PostgreSQL (requer make db-up)
	$(call RUN_BACKEND,-Dspring-boot.run.profiles=postgres)

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
