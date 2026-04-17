# Setup Guide

This project is a MERN To-Do application with:

- React frontend
- Node.js + Express backend
- MongoDB database
- JWT authentication

## Project Structure

```text
To-Do/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controller/
│   ├── db/
│   ├── middleware/
│   ├── model/
│   ├── route/
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── server.js
├── API_DOCUMENTATION.md
├── QUICKSTART.md
└── SETUP.md
```

## Backend Setup

Install dependencies:

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key_here
```

Start backend:

```bash
npm run dev
```

Or:

```bash
npm start
```

## Frontend Setup

Install dependencies:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

## App Features

### Frontend

- Register page with `Name`, `Email`, `Password`
- Login page with `Email`, `Password`
- Dashboard with:
  - add task
  - view tasks
  - mark completed
  - edit task
  - delete task
  - filter tasks
  - search tasks

### Backend

- user registration
- user login
- get current user
- add task
- get user-specific tasks
- update task
- update task status
- delete task

## Auth Flow

1. User registers or logs in
2. Backend returns JWT token
3. Frontend stores token in `localStorage`
4. Frontend validates token with `/auth/get-me`
5. Protected dashboard is only available for authenticated users
6. Task routes require Bearer token

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/get-me`

### Tasks

- `GET /api/tasks/all`
- `POST /api/tasks/create`
- `PUT /api/tasks/edit/:taskId`
- `PUT /api/tasks/status/:taskId`
- `DELETE /api/tasks/delete/:taskId`

## Notes

- Restart the backend after backend code changes
- Restart the frontend after changing `client/.env`
- The frontend uses `axios` directly in components/context
- The dashboard UI matches the login/register style

## Submission Checklist

- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Register works
- [ ] Login works
- [ ] Dashboard opens after login
- [ ] Add task works
- [ ] Complete task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Filter works
- [ ] Protected routes require login
