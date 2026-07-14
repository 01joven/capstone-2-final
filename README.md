# Memorial Map Service

**Preserving Memories... Mapping History**

A full-stack web application for discovering, exploring, and reserving memorial sites. Built with React, Express, and Neon PostgreSQL.

---

## Project Structure

```
capstone final/
│
├── backend/                    # Express API Server
│   ├── config/
│   │   └── db.js               # Neon PostgreSQL connection
│   ├── controllers/
│   │   ├── authController.js   # Register & Login logic
│   │   ├── userController.js   # Profile & Onboarding
│   │   ├── memorialController.js
│   │   ├── reservationController.js
│   │   ├── favoriteController.js
│   │   └── paymentController.js
│   ├── database/
│   │   └── schema.sql          # Run this in Neon to create tables
│   ├── middleware/
│   │   └── auth.js             # JWT authentication
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── memorials.js
│   │   ├── reservations.js
│   │   ├── favorites.js
│   │   └── payments.js
│   ├── .env.example            # Copy to .env and fill in values
│   ├── package.json
│   └── server.js               # Main entry point
│
├── frontend/                   # React App (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx      # App layout with sidebar
│   │   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   │   ├── MemorialCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx # Public landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Onboarding.jsx  # 3-step onboarding
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MapView.jsx     # Interactive map
│   │   │   ├── Search.jsx
│   │   │   ├── ReservationDetail.jsx
│   │   │   ├── Payments.jsx
│   │   │   ├── Saved.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios API calls
│   │   ├── App.jsx             # Routes
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Neon PostgreSQL](https://neon.tech/) account (free tier works)

### Step 1: Set Up Neon Database

1. Go to [https://neon.tech](https://neon.tech) and create a free account
2. Create a new project and copy your **Connection String**
3. Open the Neon SQL Editor
4. Copy and paste the contents of `backend/database/schema.sql` and run it

### Step 2: Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder (copy from `.env.example`):

```env
PORT=5000
DATABASE_URL=postgresql://your_user:your_password@ep-xxxx.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_key_here
```

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`

### Step 3: Set Up Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/update` | Update profile |
| POST | `/api/users/onboarding-complete` | Mark onboarding done |
| GET | `/api/memorials` | List memorials (search & filter) |
| GET | `/api/memorials/:id` | Get memorial details |
| GET | `/api/reservations/user-reservations` | User's reservations |
| POST | `/api/reservations/create` | Create reservation |
| GET | `/api/favorites` | Get saved memorials |
| POST | `/api/favorites/add` | Save a memorial |
| DELETE | `/api/favorites/remove/:id` | Remove saved |
| GET | `/api/payments` | Payment history |
| POST | `/api/payments/create` | Process payment |

---

## User Flow

1. **Landing Page** → Login or Register
2. **Onboarding** → 3-step walkthrough (first time only)
3. **Dashboard** → Overview with stats and quick actions
4. **Map** → Interactive map with memorial pins
5. **Search** → Find memorials by name/category
6. **Reservations** → Book a visit to a memorial site
7. **Payments** → Pay for reservations
8. **Saved** → View bookmarked memorials
9. **Profile** → Account settings and activity

---

## Where to Put Your Code

| What you want to add | Put it here |
|---------------------|-------------|
| New API endpoint | `backend/routes/` + `backend/controllers/` |
| Database table/column | `backend/database/schema.sql` |
| New page/screen | `frontend/src/pages/` |
| Reusable UI component | `frontend/src/components/` |
| API call function | `frontend/src/services/api.js` |
| Global styles | `frontend/src/index.css` |
| Page-specific styles | Same folder as the page (e.g. `Dashboard.css`) |
| Auth logic | `frontend/src/context/AuthContext.jsx` |
| Environment variables | `backend/.env` |
