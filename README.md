# News Portal

A full-stack News Portal web application built using React, Node.js, Express.js, and MongoDB. The application allows users to browse news articles, view article details, register and log in, and manage news content through protected pages.

## Features

- Browse news articles.
- View individual news articles.
- Explore top news.
- User registration and login.
- JWT-based authentication.
- Protected routes for authenticated users.
- Create, edit, and delete news articles.
- Personal news management.
- User profile management.
- Contact form.
- Responsive frontend layout.

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- Zustand
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS

## Project Structure

```text
news-portal/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
```

## Installation and Setup

### 1. Clone the repository

git clone https://github.com/Prince-2000-8/news-portal.git

cd news-portal

### 2. Backend Setup

cd backend

npm install

Create a `.env` file inside the backend directory.

Add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=your_frontend_url

Start the backend:

npm run dev

### 3. Frontend Setup

Open another terminal:

cd frontend

npm install

npm run dev

The frontend development server will provide a local URL in your terminal.

## Main API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | User login |
| GET | /api/news | Get all news |
| GET | /api/news/top | Get top news |
| GET | /api/news/:id | Get news details |
| GET | /api/news/mynews | Get the authenticated user's news
| POST | /api/news | Create news (protected) |
| POST | /api/contact | Submit the contact form |
| PUT | /api/news/:id | Update news (protected) |
| DELETE | /api/news/:id | Delete news (protected) |
| GET | /api/users/profile | Get user profile |
| PUT | /api/users/profile | Update user profile |


## Author

**MD. Ariful Islam Prince**

GitHub: https://github.com/Prince-2000-8
