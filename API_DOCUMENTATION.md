# API Documentation

## Base URL

```text
http://localhost:5000/api
```

## Authentication

Protected routes require a Bearer token:

```text
Authorization: Bearer <token>
```

## Auth Endpoints

### `POST /auth/register`

Create a new user.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Secret123"
}
```

Success response:

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "fullName": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### `POST /auth/login`

Log in an existing user.

Request body:

```json
{
  "email": "john@example.com",
  "password": "Secret123"
}
```

Success response:

```json
{
  "message": "User logged in successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "fullName": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### `GET /auth/get-me`

Get the currently authenticated user.

Success response:

```json
{
  "message": "User fetched successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

## Task Endpoints

### `GET /tasks/all`

Get all tasks for the logged-in user.

Optional query:

```text
?status=pending
?status=completed
```

Success response:

```json
{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-04-18T10:00:00.000Z",
      "updatedAt": "2026-04-18T10:00:00.000Z"
    }
  ]
}
```

### `POST /tasks/create`

Create a new task.

Request body:

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

Success response:

```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-04-18T10:00:00.000Z",
    "updatedAt": "2026-04-18T10:00:00.000Z"
  }
}
```

### `PUT /tasks/edit/:taskId`

Update title and/or description.

Request body:

```json
{
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples"
}
```

Success response:

```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Buy groceries and fruits",
    "description": "Milk, eggs, bread, apples",
    "status": "pending"
  }
}
```

### `PUT /tasks/status/:taskId`

Mark a task as pending or completed.

Request body:

```json
{
  "status": "completed"
}
```

Allowed values:

```text
pending
completed
```

Success response:

```json
{
  "message": "Task status updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "completed"
  }
}
```

### `DELETE /tasks/delete/:taskId`

Delete a task.

Success response:

```json
{
  "message": "Task deleted successfully"
}
```

## Common Error Responses

```json
{
  "message": "Please fill all the fields"
}
```

```json
{
  "message": "Invalid token"
}
```

```json
{
  "message": "Task not found"
}
```

## cURL Examples

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Secret123"
  }'
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Secret123"
  }'
```

Create task:

```bash
curl -X POST http://localhost:5000/api/tasks/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

Update status:

```bash
curl -X PUT http://localhost:5000/api/tasks/status/TASK_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "completed"
  }'
```
