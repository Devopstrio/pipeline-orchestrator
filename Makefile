.PHONY: help build up down test lint migrate simulate-execution run-scheduler

help:
	@echo "Pipeline Orchestrator - Management Commands"
	@echo "-------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + DAG)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "simulate-execution : Trigger a mock DAG pipeline execution"
	@echo "run-scheduler      : Start the cron/event scheduling engine"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/workflows
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

simulate-execution:
	docker-compose exec api python scripts/execute/trigger_dag.py

run-scheduler:
	docker-compose exec api python apps/scheduling-engine/main.py
