# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

## Postgres Docker command
```docker run \
  -p 5432:5432 \
  --name container-postgresdb \
  -e POSTGRES_PASSWORD=admin \
  -d postgres
```

## Postgres Docker command with pgAdmin
```docker run \
  -p 5050:80 \
  -e "PGADMIN_DEFAULT_EMAIL=pgadmin@pgadmin.org" \
  -e "PGADMIN_DEFAULT_PASSWORD=pgadmin" \
  -d dpage/pgadmin4
```

## pgAdmin
name: container-postgresdb
host: host.docker.internal
database: postgres
user: postgres
password: admin

Open http://localhost:3000/ with your browser to see the result.