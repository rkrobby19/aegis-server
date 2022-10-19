# Project Title

Aegis

## Description

It will provide APIs for the frontend to do following things:

- Create and manage wallet accounts.
- Record all balance changes to each of the wallet accounts. So every time some money is added to or subtracted from the account, an account entry record will be created.

## Getting Started

### Dependencies

- [Docker](https://www.docker.com/products/docker-desktop/)
- [make](https://linuxhint.com/install-make-ubuntu/)
- [pnpm](https://pnpm.io/installation)

### Environment Parameter

| Key            | Desc                        |
| -------------- | --------------------------- |
| APP_PORT       | Application Port            |
| DB_CONNECTION  | Type of Database Connection |
| DB_USERNAME    | Postgres Username           |
| DB_PASSWORD    | Postgres Password           |
| DB_DATABASE    | Postgres Database Name      |
| DB_PORT        | Postgres Port               |
| CONTAINER_PORT | Docker Port                 |
| CONTAINER_NAME | Docker Container Name       |
| DOCKER_IMAGE   | Docker Image Postgres       |

### Setup infrastructure

- Install all dependencies

```
pnpm install
```

- Create postgres container:

```
make postgres
```

- Start postgres container:

```
make startcontainer
```

- Create database:

```
make createdb
```

- Drop database:

```
make dropdb
```

- Run db migration up all versions:

```
make migrateup
```

- Run db migration down all versions:

```
make migratedown
```

### How to run

- Run server:

```
make start
```
