# To-Do Application - Complete Setup Guide

This guide covers setting up and running the entire To-Do Application (Frontend + Backend).

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Cloud) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for version control)

## Project Structure

```
To-Do/
├── client/                 # React Frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── server/                 # Node.js Backend
│   ├── controller/
│   ├── model/
│   ├── route/
│   ├── middleware/
│   ├── db/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Backend Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app?retryWrites=true&w=majority
```

### 3. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend should start at `http://localhost:5000`

**Expected output:**
```
Server running on port 5000
Database connected successfully
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Configuration

The frontend is already configured to connect to the backend at `http://localhost:5000/api`

If your backend is on a different port, update `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

### 3. Start the Frontend Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Running Both Servers

You need **two terminal windows/tabs**:

### Terminal 1 - Backend:
```bash
cd server
npm start
```

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically or use MongoDB Compass
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Verify connection:
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file with your connection string

## API Endpoints

### Authentication Routes

```
POST /api/auth/register
- Body: { name, email, password }
- Response: { user, token }

POST /api/auth/login
- Body: { email, password }
- Response: { user, token }
```

### Task Routes (Protected - Require Token)

```
GET /api/task
- Returns: Array of tasks for logged-in user

POST /api/task
- Body: { title, description, priority }
- Returns: Created task object

PUT /api/task/:id
- Body: { title, description, priority, completed }
- Returns: Updated task object

DELETE /api/task/:id
- Returns: Success message
```

## Application Flow

```
1. User visits http://localhost:5173
   ↓
2. Not authenticated → Redirect to /login
   ↓
3. User can /register or /login
   ↓
4. Successful login → Token saved, redirect to /dashboard
   ↓
5. Dashboard loads tasks from backend
   ↓
6. User can create, read, update, delete tasks
   ↓
7. User can logout → Token removed, redirect to /login
```

## Testing the Application

### 1. Register a New User

1. Click "Register here" on the login page
2. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Password: Test1234 (meets all requirements)
   - Confirm Password: Test1234
3. Click "Register"
4. You'll be redirected to login

### 2. Login

1. Enter your email and password
2. Click "Login"
3. You should see the Dashboard

### 3. Test Task Management

1. Click "Add New Task"
2. Create a task with:
   - Title: Buy groceries
   - Description: Milk, eggs, bread
   - Priority: High
3. Click "Add Task"
4. Try editing, completing, and deleting tasks
5. Use search and filter features
6. Click "Logout"

## Build for Production

### Frontend Build

```bash
cd client
npm run build
```

This creates optimized files in `dist/` folder

### Backend Deployment

For production deployment, consider:
- **Heroku**: `git push heroku main`
- **Railway.app**: Connect GitHub repository
- **Render.com**: Connect GitHub repository
- **DigitalOcean**: Deploy Node.js app
- **AWS/Google Cloud**: Virtual machine deployment

## Troubleshooting

### Issue: "Cannot connect to API"

**Solution:**
1. Verify backend is running: `http://localhost:5000`
2. Check backend console for errors
3. Verify MongoDB connection
4. Check firewall settings

### Issue: "CORS Error"

**Solution:**
1. Ensure backend has CORS enabled
2. Check `app.js` for CORS configuration
3. Verify API_BASE_URL in frontend is correct

### Issue: "Invalid credentials during login"

**Solution:**
1. Verify you registered first
2. Use correct email/password combination
3. Check MongoDB has the user data
4. Verify password requirements were met during registration

### Issue: "Tasks not loading"

**Solution:**
1. Verify you're logged in
2. Check token is saved in localStorage
3. Verify backend task route is working
4. Check browser console for errors

### Issue: MongoDB Connection Error

**Solution:**
1. For local MongoDB:
   - Verify MongoDB is running
   - Check connection string in .env
2. For MongoDB Atlas:
   - Verify IP whitelist includes your IP
   - Check username/password
   - Ensure cluster is active

### Issue: Port Already in Use

**Solution:**
```bash
# Windows - Find process on port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

## Environment Variables Reference

### Backend (.env)

```env
PORT=5000                                          # Server port
MONGODB_URI=mongodb://localhost:27017/todo-app    # Database connection
JWT_SECRET=your_secret_key_here                   # JWT signing key
NODE_ENV=development                              # Environment (development/production)
```

### Frontend

Environment is set in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Performance Tips

1. **Frontend:**
   - Use production build: `npm run build`
   - Enable browser caching
   - Use CDN for static assets

2. **Backend:**
   - Enable database indexing
   - Use pagination for large task lists
   - Implement rate limiting

3. **Database:**
   - Create indexes on frequently queried fields
   - Regular backups (especially with MongoDB Atlas)

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong JWT_SECRET** - Generate a random string
3. **Enable MongoDB authentication** - Use username/password
4. **Use HTTPS in production** - Not HTTP
5. **Validate all inputs** - Both frontend and backend
6. **Use environment variables** - Never hardcode secrets
7. **Keep dependencies updated** - Run `npm audit`

## Development Workflow

```bash
# 1. Start backend
cd server
npm start

# 2. In new terminal, start frontend
cd client
npm run dev

# 3. Open browser to http://localhost:5173
# 4. Make changes and see live updates
# 5. When done, stop both servers with Ctrl+C
```

## Deployment Checklist

Before deploying to production:

- [ ] Test all features locally
- [ ] Remove console.log statements
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Enable CORS for production domain only
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure production database
- [ ] Set up environment variables on host
- [ ] Test backend API endpoints
- [ ] Test frontend build
- [ ] Set up monitoring/logging
- [ ] Plan for backups
- [ ] Document deployment process

## Additional Resources

- **React Documentation**: https://react.dev
- **Node.js Documentation**: https://nodejs.org/docs
- **MongoDB Documentation**: https://docs.mongodb.com
- **Vite Documentation**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com

## Support & Contact

For issues or questions:
1. Check the troubleshooting section
2. Review error messages in browser console
3. Check backend server logs
4. Verify MongoDB connection

---

**Last Updated:** April 2024
**Version:** 1.0.0
