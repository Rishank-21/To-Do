# Quick Start Guide

Get the To-Do Application running in 5 minutes!

## Prerequisites

- Node.js installed ([Download](https://nodejs.org/))
- MongoDB running locally or MongoDB Atlas account

## Step 1: Start Backend (Terminal 1)

```bash
cd server
npm install
npm start
```

**Expected Output:**
```
Server is running on port 5000
```

## Step 2: Start Frontend (Terminal 2)

```bash
cd client
npm install
npm run dev
```

**Expected Output:**
```
  VITE v8.0.4  ready in 300 ms

  ➜  Local:   http://localhost:5173/
```

## Step 3: Open in Browser

Visit: `http://localhost:5173`

## Step 4: Test the Application

### Register a New Account
1. Click "Register here"
2. Fill in the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `Test1234`
   - Confirm: `Test1234`
3. Click "Register"

### Login
1. Enter email: `john@example.com`
2. Enter password: `Test1234`
3. Click "Login"

### Create Tasks
1. Click "Add New Task"
2. Enter:
   - Title: `Buy groceries`
   - Description: `Milk, eggs, bread`
   - Priority: `High`
3. Click "Add Task"

### Manage Tasks
- ⭕ **Complete**: Click circle icon to mark complete
- ✏️ **Edit**: Click pencil icon to edit
- 🗑️ **Delete**: Click trash icon to delete
- 🔍 **Search**: Use search bar to find tasks
- 🎯 **Filter**: Click filter buttons (All/Pending/Completed)

## Features Overview

| Feature | Status |
|---------|--------|
| User Registration | ✅ Complete |
| User Login | ✅ Complete |
| Add Tasks | ✅ Complete |
| View Tasks | ✅ Complete |
| Edit Tasks | ✅ Complete |
| Delete Tasks | ✅ Complete |
| Mark Complete | ✅ Complete |
| Search Tasks | ✅ Complete |
| Filter Tasks | ✅ Complete |
| Priority Levels | ✅ Complete |
| Task Statistics | ✅ Complete |
| Responsive Design | ✅ Complete |

## Project Files

### Frontend Components Created:
- `src/components/Register.jsx` - Registration page
- `src/components/Login.jsx` - Login page
- `src/components/Dashboard.jsx` - Main dashboard
- `src/components/TaskForm.jsx` - Task creation/editing
- `src/components/TaskList.jsx` - Task display
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/context/AuthContext.jsx` - Authentication state
- `src/services/api.js` - API integration

### Updated Files:
- `src/App.jsx` - Routing setup
- `src/main.jsx` - Entry point
- `src/index.css` - Global styles
- `vite.config.js` - Vite configuration

## Troubleshooting

### Page doesn't load?
```bash
# Clear cache and refresh
# Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Mac)
```

### API connection error?
- Verify backend is running: `http://localhost:5000`
- Check backend console for errors

### Can't login?
- Use the exact credentials from registration
- Check password meets requirements (uppercase, number, 6+ chars)

### MongoDB connection error?
- Start MongoDB: `mongod` (Windows/Linux) or `brew services start mongodb-community` (Mac)
- Or use MongoDB Atlas connection string

## Environment Setup

### Backend (.env)
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend
Already configured. Edit `src/services/api.js` if backend port changes.

## Next Steps

1. ✅ Test all features
2. 📝 Read [SETUP.md](./SETUP.md) for detailed configuration
3. 📚 Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
4. 📖 Read [client/README.md](./client/README.md) for frontend details
5. 🚀 Deploy to production

## Common Commands

```bash
# Frontend Development
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run linter

# Backend Development
npm start           # Start server
npm run dev         # Start with auto-reload
```

## Stop the Servers

**In each terminal:** Press `Ctrl+C`

---

**That's it! You're ready to use the To-Do Application!** 🎉
