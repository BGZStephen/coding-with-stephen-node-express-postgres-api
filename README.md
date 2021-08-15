# Coding with stephen: Node, Express, Posrtgres API

## What we'll be building

A RESTful API for user management, with the following functionality:

- Create users
- Update users
- Delete users
- Authenticate users
- Reset user passwords

This functionality will be built with realt world usage expectations, meaning we'll be handling edge cases, validation of user inputs, constraints (password strength) and authorization (ensuring users cannot access others)

## What useful things you'll learn

- Standing up an application locally
- Working with docker compose for local database development
- Achieving high (100%) test coverage for unit tests
- Integration testing to support unit test assu,ptions
- Dealing with user provided inputs
- Enforcing password strengths
- Creating re-usable middleware for express
- Creatung useful test fixtures
- Clear separation of concern

## What technologies will be used

### Core API
- Node
- Express

### Database

- Postgres (`pg`)
- Migrations (`node-pg-migrate`)

### Testing
  
- Jest (Unit + integration tests)

### Validation

- Joi (`@hapi/joi`)

### Systems

- Docker compose
- Nodemon
