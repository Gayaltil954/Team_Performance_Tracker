# Team Performance Tracker (Full Stack)

A technical-assessment-ready Team Performance Tracker built with:

- Frontend: React + Hooks + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)

## Features

- Dashboard with member cards
- Add team member form
- Update performance score by `+5` / `-5`
- Delete member
- Sorting toggle: default order / top performers
- Conditional score styling:
  - `< 40` → red state
  - `> 80` → green state
- Loading, error, and empty states
- Backend input validation and proper HTTP responses
- Seed script with sample manager and members

## Project Structure

- `frontend/` React application
- `backend/` REST API with MongoDB

## Prerequisites

- Node.js 18+
- MongoDB local instance or MongoDB Atlas URI

## Backend Setup

1. Open terminal in `backend/`
2. Install packages:
   - `npm install`
3. Create `.env` from `.env.example`
4. Start API:
   - `npm run dev`

### Seed sample data

- `npm run seed`

Seed creates a manager account and three sample members.

Default seeded manager values are controlled by backend `.env`:

- `SEED_MANAGER_EMAIL`
- `SEED_MANAGER_PASSWORD`

## Frontend Setup

1. Open terminal in `frontend/`
2. Install packages:
   - `npm install`
3. Set env in `frontend/.env`:
   - `VITE_API_URL=http://localhost:5000/api`
4. Start app:
   - `npm run dev`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/members`
- `POST /api/members`
- `PUT /api/members/:id`
- `DELETE /api/members/:id`

## Notes

- Score updates are validated to steps of `5` on backend.
- API expects JWT in `Authorization: Bearer <token>` for member endpoints.
- Designed for interview delivery: clean structure, modular components, and readable code.
