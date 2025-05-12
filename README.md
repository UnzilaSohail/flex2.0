
 FLEX-2.0

## 📚 Project Description
FLEX-2.0 is a University Management System built using the MERN stack (MongoDB, Express, React, Node.js). The system automates core university functionalities such as:
- Attendance management
- Announcements
- Feedback handling
etc

All components are containerized using Docker for consistent development and deployment.

---

 📁 Project Structure

```

flex2.0/
│
├── backend/            # Node.js + Express server
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/           # React application
│   ├── public/
│   ├── src/
│   └── ...
│
├── docker-compose.yml  # Multi-container orchestration
└── README.md

````

---

## ⚙️ Technologies Used

- Frontend: React.js, HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB (with Mongoose)
- Containerization: Docker

---

## 🛠️ Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed and running
- [Node.js](https://nodejs.org/en/download) (optional for local non-docker development)

---

## 🚀 Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/UnzilaSohail/flex2.0.git
cd flex2.0
````

### 2. Run with Docker

#### Option A: Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5000)

#### Option B: Manually build & run containers

Backend:

```bash
cd backend
docker build -t flex-backend .
docker run -d -p 5000:5000 flex-backend
```

Frontend:

```bash
cd frontend
docker build -t flex-frontend .
docker run -d -p 3000:3000 flex-frontend
```

---

## 🧪 Local Development (Without Docker)

### Backend:

```bash
cd backend
npm install
npm run dev
```

### Frontend:

```bash
cd frontend
npm install
npm start
```

---

## 📝 Features

* 📌 Faculty can post announcements
* 🕒 Students can mark attendance via QR or login
* 🗣️ Feedback module for students to submit concerns
*  Admin module can maintain overall management system
---

## 📂 Environment Variables

Make sure to create `.env` files for both frontend and backend:
Backend `.env` example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/flex
JWT_SECRET=your_jwt_secret
```

---


---

## 👤 Author

* Unzila Anjum
  GitHub: [@UnzilaSohail](https://github.com/UnzilaSohail)

---


