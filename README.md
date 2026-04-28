# Suvidha Elite Frontend

This is the standalone React + Vite frontend for Suvidha Elite.

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

## Demo Accounts

- Admin: `admin@suvidha.com` / `admin123`
- Support: `support@suvidha.com` / `support123`

You can also register new `user` and `professional` accounts from the UI.

## Working Features

- Register
- Login
- Refresh token
- Current user profile
- Update profile
- Logout
- Auto logout after inactivity
- User/professional role switching

## Notes

- Auth is connected to the Spring Boot backend.
- Inactivity timeout is set in `.env` with `VITE_INACTIVITY_TIMEOUT_MS`.
- Forgot password and reset password are demo placeholders.
- Some non-auth modules still use frontend-side mock data.
