# E-Commerce Sales Dashboard

Lightweight full-stack starter for an e-commerce sales dashboard with React frontend and Node/Express backend.

This repository contains a simple dashboard demo (charts, summary cards, top-products table) and a minimal auth example (JWT + MongoDB).

## Quick start

1. Install backend dependencies and start server:

```powershell
cd backend
npm install
npm run dev
```

2. Install frontend dependencies and start the React app:

```powershell
cd frontend
npm install
npm start
```

Open the frontend at http://localhost:3000 and the backend at http://localhost:5000 by default.

## Project structure

- `backend/` — Express API, Mongoose models, auth routes
- `frontend/` — Create React App frontend with components and charts

## Environment

Create a `.env` file in `backend/` with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecom-dashboard
JWT_SECRET=your_jwt_secret
```

## Notes

- The backend requires a running MongoDB instance (or Atlas connection via `MONGO_URI`).
- The frontend expects the backend to be available at `http://localhost:5000` (the frontend `package.json` may include a `proxy`).

If you'd like a different README layout or specific content (screenshots, install scripts, or badges), tell me how you want it and I'll update `README.md` accordingly.

---
Updated: reverted to minimal project README for E-Commerce Sales Dashboard.
