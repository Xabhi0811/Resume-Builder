# AI Resume Builder

**AI Resume Builder** is a full-stack web application for creating, editing, and enhancing resumes using AI. The project contains a Node.js + Express backend (with OpenAI integration and ImageKit for image handling) and a React + Vite frontend. This README documents the architecture, setup, environment variables, API endpoints, and developer workflows.

---

**Table of Contents**
- Project summary
- Features
- Architecture & folder structure
- Backend
  - Stack
  - Environment variables
  - Scripts
  - API endpoints
  - Models
- Frontend
  - Stack
  - Environment variables
  - Scripts
  - Key modules
- Local development (run steps)
- Docker (compose)
- Troubleshooting
- Contributing
- License

---

**Project summary**
- Purpose: Help users build and improve resumes using AI-assisted extraction and enhancement, store multiple versions, and preview/export resumes.
- Main capabilities:
  - Register/login users
  - Create, update, delete resumes
  - Extract structured resume data from plain text via AI
  - Enhance professional summary and job descriptions using AI
  - Upload and host portrait images via ImageKit

**Features**
- User authentication (JWT)
- Resume management (create, edit, delete, public share)
- AI-powered resume parsing and content enhancement
- Image upload support with optional background removal
- Multiple templates in frontend for preview

**Architecture & folder structure (top-level)**
- Backend/: Node.js + Express API
- Frontend/: React + Vite SPA
- docker-compose.yml: dev container orchestration (optional)

---

## Backend

Path: `Backend/`

Stack
- Node.js (ESM)
- Express
- MongoDB (mongoose)
- OpenAI (via `openai` package)
- ImageKit (`@imagekit/nodejs`)
- Multer for file uploads

Main files
- `server.js` — Express server entrypoint.
- `config/db.js` — MongoDB connection helper.
- `config/ai.js` — OpenAI client configuration.
- `config/imageKit.js` — ImageKit client configuration.
- `config/multer.js` — Multer storage helper.
- `routes/` — Route definitions for users, resumes, and AI endpoints.
- `Controller/` — Handlers for auth, resume logic, and AI integration.
- `models/` — `User` and `Resume` Mongoose models.

Environment variables (create `Backend/.env`)
- `PORT` — server port (default: `5000`)
- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/mydb`)
- `JWT_SECRET` — secret for signing JWT tokens
- `OPENAI_API_KEY` — OpenAI API key (or provider API key)
- `OPENAI_BASE_URL` — optional custom base URL for OpenAI-compatible APIs
- `OPENAI_MODEL` — model identifier used for chat/completions
- `IMAGEKIT_PRIVATE_KEY` — ImageKit private key
- `IMAGEKIT_PUBLIC_KEY` — ImageKit public key
- `IMAGEKIT_URL_ENDPOINT` — ImageKit URL endpoint

Important: Do NOT commit real API keys or secrets to version control. Use environment variables or secrets management.

Scripts (in `Backend/package.json`)
- `npm run start` — run `node server.js`
- `npm run server` — run `nodemon server.js` (dev)

API endpoints (prefix: `/api`)
- Auth / Users (`/api/users`)
  - POST `/register` — Register new user (body: `name`, `email`, `password`)
  - POST `/login` — Login, returns `token`
  - GET `/data` — Protected; returns current user data (requires `Authorization: Bearer <token>`)
  - GET `/resumes` — Protected; list user resumes

- Resumes (`/api/resumes`)
  - POST `/create` — Protected; create a blank resume (body: `title`)
  - PUT `/update` — Protected; update resume data (supports `multipart/form-data` with `image`), body fields include `resumeId`, `resumeData` (JSON string or object), `removeBackground` flag
  - DELETE `/delete/:resumeId` — Protected; delete resume
  - GET `/get/:resumeId` — Protected; get user's resume by id
  - GET `/public/:resumeId` — Public; get published resume

- AI (`/api/ai`)
  - POST `/enhance-pro-sum` — Protected; enhance professional summary (body: `userContent`)
  - POST `/enhance-job-desc` — Protected; enhance job description (body: `userContent`)
  - POST `/upload-resume` — Protected; upload resume plain text for parsing; returns created resume id

Models (high-level)
- `User` model: `name`, `email`, `password` (bcrypt hashed). Includes `comparePassword` helper.
- `Resume` model: `userId`, `title`, `public`, `template`, `accent_color`, `professional_summary`, `skills` array, `personal_info`, `experience`, `project`, `education`, timestamps.

Notes on AI integration
- The backend uses `openai` client and calls `ai.chat.completions.create(...)` with `process.env.OPENAI_MODEL`. Responses are parsed and used either to return enhanced content or to extract structured JSON for resume creation.

---

## Frontend

Path: `Frontend/`

Stack
- React + Vite
- Redux Toolkit
- Axios (for API calls)
- Tailwind (configured)

Main files
- `src/main.jsx`, `src/App.jsx` — app entry
- `src/pages/*` — pages (Dashboard, Home, Login, ResumeBuilder, Preview)
- `src/components/` — forms and UI components
- `src/app/store.js` and `src/app/features/authSlice.js` — Redux store and auth slice
- `src/configs/api.js` — Axios instance; base URL read from `import.meta.env.VITE_BASE_URL`

Environment variables (create `Frontend/.env`)
- `VITE_BASE_URL` — backend base URL (e.g. `http://localhost:5000`)

Scripts (in `Frontend/package.json`)
- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run preview` — preview the built site

Key behavior
- Frontend sends authenticated requests using JWT token obtained at login.
- Templates for resume preview live in `src/components/templates` and `src/assets/templates`.

---

## Local development — quick start

Prerequisites
- Node.js (>= 18 recommended)
- npm or yarn
- MongoDB running locally (or use a hosted MongoDB and set `MONGO_URI`)

Backend (dev)
1. Open a terminal in `Backend/`
2. Copy `.env.example` or create `.env` with the variables listed earlier
3. Install and run:

```bash
cd Backend
npm install
npm run server   # starts nodemon server (or npm run start)
```

Frontend (dev)
1. Open another terminal in `Frontend/`
2. Create `.env` with `VITE_BASE_URL` pointing to backend (e.g. `http://localhost:5000`)
3. Install and run:

```bash
cd Frontend
npm install
npm run dev
```

Now open the frontend dev server URL (printed by Vite) in your browser.

API testing
- Use Postman / curl to test endpoints. Protected endpoints require `Authorization: Bearer <token>`.

---

## Docker (optional)

This repository contains `docker-compose.yml` at root. You can run both services (if configured) and a MongoDB service using Docker Compose.

Typical command:

```bash
docker-compose up --build
```

Adjust the compose file and environment variables for production before deploying.

---

## Troubleshooting
- Server fails to connect to MongoDB: verify `MONGO_URI` and that MongoDB is running.
- OpenAI calls failing: check `OPENAI_API_KEY`, `OPENAI_BASE_URL` and model name; ensure network access.
- ImageKit uploads: ensure `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_PUBLIC_KEY`, and `IMAGEKIT_URL_ENDPOINT` are configured.
- CORS issues: ensure frontend `VITE_BASE_URL` and backend CORS settings match your dev URLs.

## Contributing
- Fork the repo, create a feature branch, make changes, create a PR describing your changes.

## License
- This project currently does not include a license file. Add a license of your choice (e.g., MIT) to `LICENSE`.

---



If you'd like, I can:
- add a `.env.example` file with placeholders,
- create a short CONTRIBUTING.md,
- or update the `docker-compose.yml` instructions with exact service names.
