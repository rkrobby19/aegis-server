ifneq (,$(wildcard ./.env.development))
	include .env.development
	export
endif

postgres:
	docker run --name ${CONTAINER_NAME} -p ${DB_PORT}:${CONTAINER_PORT} -e POSTGRES_USER=${DB_USERNAME} -e POSTGRES_PASSWORD=${DB_PASSWORD} -d ${DOCKER_IMAGE}

startcontainer:
	docker start ${CONTAINER_NAME}

createdb:
	docker exec -it ${CONTAINER_NAME} createdb --username=${DB_USERNAME} --owner=${DB_USERNAME} ${DB_DATABASE}

dropdb:
	docker exec -it ${CONTAINER_NAME} dropdb ${DB_DATABASE} -U ${DB_USERNAME}

migrateup:
	npx sequelize-cli db:migrate

migratedown:
	npx sequelize-cli db:migrate:undo

developmentup:
	docker compose -f docker-compose.dev.yml up --build

developmentdown:
	docker compose -f docker-compose.dev.yml down -v

productionup:
	sudo docker compose -f docker-compose.prod.yml up --build

productiondown:
	sudo docker compose -f docker-compose.prod.yml down -v


.PHONY: postgres startcontainer createdb dropdb migrateup migratedown developmentup developmentdown productionup productiondown
