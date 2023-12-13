# Banana

## Run the project

### Install dependencies

```bash
yarn
```

### Environment variables

Create a `.env.local` file in the root of the project and add the variables in `.env.example`.

### Database

1. Start database

```bash
docker compose up -d
```

Or, alternatively, you can simply host a postgres database in pgAdmin4.

2. Run migrations

```bash
yarn migrate
```

This will execute a script that sets up the database configurations.

### Start the server

```bash
yarn dev
```
