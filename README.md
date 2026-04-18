# 📝 MERN Stack To-Do Application

A full-stack To-Do application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, and manage their personal tasks securely with JWT authentication.

---

## 🚀 Live Demo

🌐 **Frontend (Vercel):**  
https://to-do-psi-bice-47.vercel.app/

⚙️ **Backend (Render):**  
https://to-do-cu5r.onrender.com/

---

## 📂 GitHub Repository

🔗 https://github.com/Rishank-21/To-Do/

---

## ✨ Features

### 🔐 Authentication
- User Registration  
- User Login  
- JWT-based Authentication  
- Protected Routes  

### 📝 Task Management
- Add New Task  
- View All Tasks (User-specific)  
- Mark Task as Completed  
- Delete Task  
- Edit Task *(Bonus)*  
- Filter Tasks (Completed / Pending) *(Bonus)*  

### 🎨 Frontend
- Responsive UI  
- Clean design  
- Form validation  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Token (JWT)  

---

## 📁 Folder Structure


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


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rishank-21/To-Do.git
cd To-Do
2️⃣ Setup Backend
cd server
npm install

Create a .env file inside the server/ directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the backend:

npm start
3️⃣ Setup Frontend
cd ../client
npm install
npm start
🔒 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user & get token
Task Routes (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get all tasks for logged user
POST	/api/tasks	Add a new task
PUT	/api/tasks/:id	Update task (edit/complete)
DELETE	/api/tasks/:id	Delete a task
🔑 Demo Credentials

Use these credentials to test the application:

Email: test@gmail.com
Password: 123456
🙌 Acknowledgement

This project was built as part of a MERN Stack Developer assessment.

📧 Contact

Rishank Rawat
GitHub: https://github.com/Rishank-21
