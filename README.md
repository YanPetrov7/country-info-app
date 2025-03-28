# Country Info App

A REST API application for managing country information and holidays.

## Technologies
- NestJS
- PostgreSQL
- TypeORM
- TypeScript
- Docker Compose

## Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- Git

## Installation

1. Clone the repository:
```bash
git clone git@github.com:YanPetrov7/country-info-app.git

cd country-info-app
```

2. Install dependencies:
```bash
npm i
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`

5. Start PostgreSQL database:
```bash
docker compose up
```

6. Run the application:
```bash
npm run start
```
> Also possible to use in dev mode:
> ```bash
> npm run start:dev
> ```

## Routes

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| DELETE | `/users/:id` | Delete user |

### Countries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/countries` | Get available countries list |
| GET | `/countries/:code` | Get country details (borders, population, flag) |

### Holidays

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/:userId/calendar/holidays` | Get user's holidays |
| POST | `/users/:userId/calendar/holidays` | Add holidays for user |

## Request Examples

### Create User
```json
POST /users
{
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "example@example.com"
}
```

### Add Holidays
```json
POST /users/:(someUserId)/calendar/holidays
{
  "countryCode": "US",
  "year": 2025,
  "eventNames": ["New Year's Day", "Christmas Day"]
}
```

### Get Country Info
```json
GET /countries/US
Response:
{
  "countryCode": "US",
  "borders": ["Canada", "Mexico"],
  "flag": "https://...",
  "population": [
    {
      "year": 2018,
      "value": 326687501
    }
  ]
}
```
