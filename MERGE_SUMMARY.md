# Backend Merge Summary

## What Was Done

✅ **Unified Backend Created**: Both Repair and Store backends merged into a single production-ready backend

### Key Changes:

1. **Single Server** (`backend/server.js`)
   - One Express server running on single port
   - Handles both Repair and Store systems
   - Unified error handling and middleware

2. **Unified Authentication** (`backend/src/routes/auth.routes.js`)
   - Single login endpoint: `POST /api/auth/login`
   - JWT-based authentication
   - Works for both Repair and Store systems
   - Returns token and user info with access permissions

3. **Database Configuration**
   - **PostgreSQL**: Used for Repair system and Authentication
     - Config: `backend/src/config/postgres.js`
     - Config: `backend/src/config/auth.js`
   - **Oracle**: Used for Store system
     - Config: `backend/src/config/db.js`
     - Auto-initializes on server start

4. **Routes Structure**
   - All routes under `/api` prefix
   - Repair routes: `/api/repair/*`, `/api/repair-options/*`, etc.
   - Store routes: `/api/store-indent/*`, `/api/po/*`, etc.
   - Auth route: `/api/auth/login`

5. **File Organization**
   ```
   backend/
   ├── server.js              # Main entry point
   ├── package.json           # All dependencies merged
   ├── .env.example           # Environment variables template
   ├── src/
   │   ├── config/            # Database configs
   │   ├── routes/            # All API routes
   │   ├── controllers/       # Request handlers
   │   ├── services/          # Business logic
   │   ├── middlewares/       # Auth, S3 upload, etc.
   │   └── utils/             # Helper functions
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Unified login (returns JWT)

### Repair System
- `GET /api/repair/all`
- `POST /api/repair/create`
- `GET /api/repair-options/form-options`
- `GET /api/repair-check/*`
- `GET /api/store-in/*`
- `POST /api/payment/*`
- `GET /api/dashboard/*`

### Store System
- `GET /api/user/*`
- `GET /api/store-indent/*`
- `GET /api/indent/*`
- `GET /api/po/*`
- `GET /api/items/*`
- `GET /api/stock/*`
- `GET /api/uom/*`
- `GET /api/cost-location/*`
- `GET /api/vendor-rate-update/*`
- `GET /api/three-party-approval/*`

## Setup Instructions

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## Environment Variables Required

- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret for JWT tokens
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - PostgreSQL (Repair & Auth)
- `ORACLE_USER`, `ORACLE_PASSWORD`, `ORACLE_CONNECTION_STRING` - Oracle (Store)
- `AWS_*` - AWS S3 credentials (for file uploads)

## Production Deployment

1. **On EC2:**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2

   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

2. **Using Nginx (optional):**
   - Configure reverse proxy to port 5000
   - Use SSL certificates for HTTPS

## Important Notes

- ✅ All existing logic preserved
- ✅ Same database connections (PostgreSQL + Oracle)
- ✅ Single login system (JWT-based)
- ✅ All routes working under `/api` prefix
- ✅ Production-ready with error handling
- ✅ PM2 configuration included
- ✅ Swagger documentation available at `/docs`

## Testing

1. **Health Check:**
   ```bash
   curl http://localhost:5000/
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"user_name":"admin","password":"yourpassword"}'
   ```

3. **Use token in requests:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/repair/all
   ```

## Support

- Check `README.md` for detailed documentation
- Check `QUICKSTART.md` for quick setup guide
- Review logs for any errors
- Ensure all environment variables are set correctly








