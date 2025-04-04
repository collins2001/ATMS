# Academic Task Management System (ATMS) Backend

This is the backend service for the Academic Task Management System, built with Node.js, Express, and PostgreSQL.

## Project Structure

```plaintext
backend/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── models/          # Database models
├── middlewares/     # Custom middleware functions
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions and helpers
├── app.js          # Main application file
├── package.json     # Project dependencies
└── .env            # Environment variables
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

1. Configure environment variables:

```bash
cp .env.example .env
# Update the values in .env with your configuration
```

1. Create PostgreSQL database:

```sql
CREATE DATABASE atms_db;
```

1. Start the development server:

```bash
npm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Users

- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

### Assignments

- GET /api/assignments
- POST /api/assignments
- GET /api/assignments/:id
- PUT /api/assignments/:id
- DELETE /api/assignments/:id

### Announcements

- GET /api/announcements
- POST /api/announcements
- GET /api/announcements/:id
- PUT /api/announcements/:id
- DELETE /api/announcements/:id

### Timetables

- GET /api/timetables
- POST /api/timetables
- GET /api/timetables/:id
- PUT /api/timetables/:id
- DELETE /api/timetables/:id

### Notes

- GET /api/notes
- POST /api/notes
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id

### Notifications

- GET /api/notifications
- POST /api/notifications
- GET /api/notifications/:id
- PUT /api/notifications/:id
- DELETE /api/notifications/:id

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon
- `npm test`: Run tests (to be implemented)
