# Quick Start Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

## 3. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## 4. Test the API
```bash
# Health check
curl http://localhost:5000/

# Login (example)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"user_name":"admin","password":"yourpassword"}'
```

## 5. Access Documentation
Open browser: `http://localhost:5000/docs`

## Important Notes

- **PostgreSQL**: Required for Repair system and Authentication
- **Oracle**: Required for Store system (optional if not using store features)
- **AWS S3**: Required for file uploads in Repair system
- **JWT_SECRET**: Must be set for authentication to work

## Common Issues

### Oracle Connection Error
- Ensure Oracle Instant Client is installed
- Check `ORACLE_LINUX_CLIENT_LIB_DIR` or `ORACLE_WIN_CLIENT_LIB_DIR` in .env
- Verify Oracle credentials

### PostgreSQL Connection Error
- Verify database credentials in .env
- Check if database is accessible
- Ensure SSL settings are correct

### Port Already in Use
- Change `PORT` in .env
- Or stop the process using the port








