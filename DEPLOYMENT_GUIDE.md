# Render Deployment Guide for Spring Boot Backend

## Prerequisites
- Render account (render.com)
- GitHub repository with this code
- MySQL database (can use Render's MySQL or external provider)

## Step 1: Create MySQL Database on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"MySQL"**
3. Configure:
   - **Name**: `suvidha-elite-db`
   - **Database**: `service_platform`
   - **Username**: `service_user` (or choose your own)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier
4. Click **"Create Database"**
5. Wait for creation (5-10 minutes)
6. Copy these values from the database credentials:
   - **Connection String** (looks like: `mysql://...`)
   - **Username**
   - **Password**

## Step 2: Prepare GitHub Repository

1. Push this code to your GitHub repository (if not already done)
2. Ensure the code has:
   - `pom.xml` in the root
   - `system.properties` (Java 21 specification)
   - `render.yaml` (deployment config)
   - `application.properties` with environment variables

## Step 3: Deploy Backend on Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository:
   - If not connected, click "Connect Account" and authorize GitHub
   - Select the repository containing the backend code
4. Configure the service:
   - **Name**: `suvidha-elite-backend`
   - **Environment**: Java
   - **Region**: Same as database (for performance)
   - **Branch**: `main` (or your deployment branch)
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/spring-boot-backend-0.0.1-SNAPSHOT.jar`
   - **Plan**: Free
5. Click **"Advanced"** and add these **Environment Variables**:

### Required Environment Variables

Set these based on your MySQL database credentials:

| Variable | Value | Example |
|----------|-------|---------|
| `DB_URL` | MySQL connection URL | `mysql://username:password@host:port/service_platform` |
| `DB_USER` | Database username | `service_user` |
| `DB_PASSWORD` | Database password | Your password |
| `JWT_SECRET` | Your JWT secret (min 32 chars) | Use the existing one or generate new |
| `CORS_ORIGINS` | Your frontend URL | `https://your-frontend.onrender.com` |
| `SERVER_PORT` | Leave blank (Render sets it) | (auto-set) |

6. Click **"Create Web Service"**
7. Watch the deployment in the "Events" tab

## Step 4: Update Frontend CORS Configuration

Once backend is deployed, get your backend URL from Render (e.g., `https://suvidha-elite-backend.onrender.com`)

Update your frontend's API client:
```javascript
// src/services/apiClient.js
const API_BASE_URL = process.env.VITE_API_URL || 'https://suvidha-elite-backend.onrender.com';
```

Add to your `.env` file:
```
VITE_API_URL=https://suvidha-elite-backend.onrender.com
```

## Step 5: Deploy Frontend (Optional)

If deploying frontend to Render too:
1. Go to **"New +"** → **"Static Site"** or **"Web Service"**
2. Select your frontend repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://suvidha-elite-backend.onrender.com`

## Troubleshooting

### Build fails
- Check `pom.xml` syntax
- Ensure Java 21 is compatible with your code
- Check if all dependencies are available

### Database connection fails
- Verify `DB_URL` format matches your MySQL credentials
- Ensure database is created on Render
- Check username and password

### Service crashes after deployment
- Check logs in Render dashboard
- Look for port binding issues (Render assigns port dynamically)
- Verify environment variables are set correctly

### CORS errors
- Update `CORS_ORIGINS` to include your frontend URL
- Format: `https://frontend-url.com,https://api.example.com`

### Cold starts
- Free tier has longer startup times (10-30 seconds)
- This is normal behavior

## Useful Links
- Render Docs: https://render.com/docs
- Spring Boot on Render: https://render.com/docs/deploy-spring-boot
- Environment Variables: https://render.com/docs/environment-variables
