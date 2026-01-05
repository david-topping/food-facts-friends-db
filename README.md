# Food Facts Friends - DB Migrations

This repository contains database migrations for the Food Facts Friends platform.

## Purpose

- Version and manage database schema changes
- Keep environments in sync
- Provide repeatable database updates

## Tech

- Node.js
- Sequelize
- MySQL

## Setup

```sh
npm install
```

## Run Migrations

```sh
npx sequelize-cli db:migrate
```

Undo last migration:

```sh
npx sequelize-cli db:migrate:undo
```

## Environment

Specify the environment using \`NODE_ENV\`:

```sh
NODE_ENV=production npx sequelize-cli db:migrate
```

Environments are defined in `config/config.js`.
