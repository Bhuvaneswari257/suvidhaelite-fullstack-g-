# Suvidha Elite

This project runs with:

- React + Vite frontend
- Spring Boot backend
- JWT authentication
- H2 file database for local demo data

## Run

Open two terminals in the project root.

### Terminal 1

```powershell
npm run start:backend
```

### Terminal 2

```powershell
npm run start:frontend
```

Open:

- Frontend: `http://127.0.0.1:5173`
- Backend: `http://localhost:8080`
- H2 console: `http://localhost:8080/h2-console`

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

- Inactivity timeout is set in `.env` with `VITE_INACTIVITY_TIMEOUT_MS`.
- Forgot password and reset password are demo placeholders.
- Some non-auth modules still use frontend-side mock data.
