# NestJS Transaction Management

A small NestJS API built to explore transaction handling without turning the codebase into a mess.

## Stack

- NestJS / TypeScript
- TypeORM
- SQLite
- Swagger / OpenAPI
- class-validator / class-transformer
- Dependency injection
- Cypress
- GitHub Actions

## What this is about

The interesting part here is transaction management: keeping related database operations atomic while still keeping the service layer readable and testable.

It also gave me an excuse to work with the parts of NestJS I like most — modules, dependency injection and a fairly opinionated application structure.

## Run

```bash
git clone https://github.com/Festiis/nestjs-transaction-management.git
cd nestjs-transaction-management
npm install
npm run start:dev
```

## Tests

```bash
npm run cy:test
```
