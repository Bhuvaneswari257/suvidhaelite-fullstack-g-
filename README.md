# Suvidha Elite Frontend

This is the standalone React + Vite frontend repository.

## Backend Connection

This frontend expects the backend API to run on:

- `http://localhost:8080`

Vite proxies `/api` requests to that backend during local development.

## Run

```powershell
npm install
npm run start
```

Open:

- `http://127.0.0.1:5173`

## Environment

The API base path and inactivity timeout are configured in [`.env`](./.env).

## Notes

- Auth is connected to the Spring Boot backend.
- Some non-auth modules still use frontend-side mock data.
