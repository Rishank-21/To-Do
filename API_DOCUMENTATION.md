# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Test1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 2. Login User

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Test1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User

**Endpoint:** `GET /auth/get-me`

**Description:** Get authenticated user's information

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

## Task Endpoints

### 1. Get All Tasks

**Endpoint:** `GET /tasks/all`

**Description:** Fetch all tasks for the authenticated user

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters (Optional):**
- `status` - Filter by status: `pending` or `completed`

**Success Response (200):**
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "priority": "medium",
      "completed": false,
      "createdAt": "2024-04-17T10:00:00Z",
      "updatedAt": "2024-04-17T10:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Finish project",
      "description": "Complete React frontend",
      "priority": "high",
      "completed": true,
      "createdAt": "2024-04-16T15:30:00Z",
      "updatedAt": "2024-04-17T09:00:00Z"
    }
  ]
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Not authorized"
}
```

---

### 2. Create Task

**Endpoint:** `POST /tasks/create`

**Description:** Create a new task

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium"
}
```

**Priority Values:** `low`, `medium`, `high`

**Success Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "medium",
    "completed": false,
    "createdAt": "2024-04-17T10:00:00Z",
    "updatedAt": "2024-04-17T10:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Title is required"
}
```

---

### 3. Update Task

**Endpoint:** `PUT /tasks/edit/:taskId`

**Description:** Update task details (title, description, priority)

**Parameters:**
- `taskId` - The ID of the task to update

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Optional fields):**
```json
{
  "title": "Buy groceries and cook",
  "description": "Updated description",
  "priority": "high"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries and cook",
    "description": "Updated description",
    "priority": "high",
    "completed": false,
    "createdAt": "2024-04-17T10:00:00Z",
    "updatedAt": "2024-04-17T11:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

### 4. Update Task Status

**Endpoint:** `PUT /tasks/status/:taskId`

**Description:** Mark task as completed or pending

**Parameters:**
- `taskId` - The ID of the task

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "completed": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task status updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "medium",
    "completed": true,
    "createdAt": "2024-04-17T10:00:00Z",
    "updatedAt": "2024-04-17T11:00:00Z"
  }
}
```

---

### 5. Delete Task

**Endpoint:** `DELETE /tasks/delete/:taskId`

**Description:** Delete a task permanently

**Parameters:**
- `taskId` - The ID of the task to delete

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - User doesn't have permission |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Common Error Messages

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required"
  }
}
```

---

## Request Examples using cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test1234"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test1234"
  }'
```

### Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks/all \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "medium"
  }'
```

### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/edit/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated title",
    "priority": "high"
  }'
```

### Update Task Status
```bash
curl -X PUT http://localhost:5000/api/tasks/status/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "completed": true
  }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/delete/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Response Structure

All API responses follow this structure:

```json
{
  "success": true/false,
  "message": "Descriptive message",
  "data": {} or [],
  "errors": {} (optional)
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production.

---

## Version

- **API Version:** 1.0.0
- **Last Updated:** April 2024
