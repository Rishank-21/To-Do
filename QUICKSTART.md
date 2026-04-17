# Quick Start

Run the full MERN To-Do app in a few minutes.

## Prerequisites

- Node.js
- MongoDB local or MongoDB Atlas

## 1. Start the Backend

```bash
cd server
npm install
npm run dev
```

Expected output:

```text
Server is running on port 5000
```

## 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## 3. Environment Files

### `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key_here
```

### `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 4. Test the App

### Register

Use:

- Name: `John Doe`
- Email: `john@example.com`
- Password: `Secret123`

### Login

Use the same email and password, then you should be redirected to the dashboard.

### Dashboard

Test these flows:

1. Add a new task
2. View all tasks
3. Mark a task as completed
4. Edit a task
5. Filter by `All`, `Pending`, `Completed`
6. Delete a task
7. Logout

## Main Frontend Files

- `client/src/components/Register.jsx`
- `client/src/components/Login.jsx`
- `client/src/components/Dashboard.jsx`
- `client/src/components/TaskForm.jsx`
- `client/src/components/TaskList.jsx`
- `client/src/components/ProtectedRoute.jsx`
- `client/src/context/AuthContext.jsx`

## Main Backend Files

- `server/controller/authController.js`
- `server/controller/taskController.js`
- `server/middleware/isAuth.js`
- `server/model/User.js`
- `server/model/Task.js`
- `server/route/authRoute.js`
- `server/route/taskRoute.js`

## Troubleshooting

### Backend not connecting

- Check MongoDB is running
- Check `server/.env`
- Make sure port `5000` is free

### Frontend not calling backend

- Check `client/.env`
- Restart Vite after changing `.env`

### Login not working

- Make sure the backend was restarted after latest code changes
- Verify the user exists in MongoDB

## Useful Commands

Frontend:

```bash
npm run dev
npm run lint
```

Backend:

```bash
npm run dev
npm start
```
