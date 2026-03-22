# Team Performance Tracker - Backend

Node.js + Express + MongoDB REST API for the Team Performance Tracker frontend.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication

## Setup

1. Create `.env` using `.env.example`.
2. Install dependencies:
   - `npm install`
3. Run API in development:
   - `npm run dev`

## Seed Data

Run:

- `npm run seed`

This creates a default manager and sample members.

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/members` (Bearer token)
- `POST /api/members` (Bearer token)
- `PUT /api/members/:id` (Bearer token, body `{ "delta": 5 }` or `{ "delta": -5 }`)
- `DELETE /api/members/:id` (Bearer token)
