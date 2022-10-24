ifneq (,$(wildcard ./.env.local))
	include .env.local
	export
endif

postgres:
	docker run --name ${CONTAINER_NAME} -p ${DB_PORT}:${CONTAINER_PORT} -e POSTGRES_USER=${DB_USERNAME} -e POSTGRES_PASSWORD=${DB_PASSWORD} -d ${DOCKER_IMAGE}

startcontainer:
	docker start ${CONTAINER_NAME}

createdb:
	docker exec -it ${CONTAINER_NAME} createdb --username=${DB_USERNAME} --owner=${DB_USERNAME} ${DB_DATABASE}

createdbdev:
	pnpm sequelize db:create

dropdb:
	docker exec -it ${CONTAINER_NAME} dropdb ${DB_DATABASE} -U ${DB_USERNAME}

dropdbdev:
	pnpm sequelize db:drop

migrateup:
	pnpm sequelize-cli db:migrate

migratedown:
	pnpm sequelize-cli db:migrate:undo

rundev:
	pnpm dev

.PHONY:
	postgres startcontainer createdb createdbdev dropdb dropdbdev migrateup migratedown
