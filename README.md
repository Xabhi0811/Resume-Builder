# AI Resume Builder

AI Resume Builder is a full-stack resume management app. It lets users register, log in, create multiple resumes, edit them in a structured builder, preview them with different templates, publish a resume publicly, and use AI assistance to improve summary text, job descriptions, and resume parsing.

The repository is split into a Node.js/Express backend and a React/Vite frontend. It also includes deployment automation in GitHub Actions and a root-level `docker-compose.yml` file that currently behaves more like a deployment helper than a standard local Compose stack.

## What This Project Does

The application supports the full resume workflow:

- user authentication with JWT
- resume creation, update, deletion, and fetching
- public resume viewing through a shareable link
- AI-powered generation and enhancement of resume content
- profile image upload and optional background removal
- multiple frontend resume templates with live preview
- Redux-based auth state persistence in the browser

## Top-Level Structure

```text
resume-builderaws/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── Backend/
├── Frontend/
├── README.md
└── docker-compose.yml
```

### Root files and folders

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) is the GitHub Actions workflow used for deployment to an EC2 host.
- [docker-compose.yml](docker-compose.yml) is present at the root, but it is not a conventional local service composition file. It is currently used as part of deployment-oriented automation.
- [README.md](README.md) is this documentation file.
- [Backend/](Backend) contains the API server, database models, controllers, middleware, and service integrations.
- [Frontend/](Frontend) contains the browser app built with React and Vite.

## Backend

The backend is a Node.js application using Express, MongoDB, JWT authentication, OpenAI integration, ImageKit uploads, and Multer for handling file uploads.

### Backend entrypoint

- [Backend/server.js](Backend/server.js) starts the Express app.
- It loads environment variables through `dotenv`.
- It connects to MongoDB through [Backend/config/db.js](Backend/config/db.js).
- It enables JSON parsing and CORS.
- It exposes a simple health route at `/` that returns `Server is live....`.
- It mounts three routers:
  - `/api/users`
  - `/api/resumes`
  - `/api/ai`

### Backend package scripts

From [Backend/package.json](Backend/package.json):

- `npm run start` runs `node server.js`.
- `npm run server` runs `nodemon server.js` for development.
- `npm test` is only a placeholder and exits with an error because no backend test suite is defined yet.

### Backend environment variables

Create [Backend/.env](Backend/.env) with the values used throughout the backend:

- `PORT` - server port. The code falls back to `3000` if this is not set.
- `MONGO_URI` - MongoDB connection string.
- `JWT_SECRET` - secret used to sign authentication tokens.
- `OPENAI_API_KEY` - OpenAI API key or equivalent provider key.
- `OPENAI_BASE_URL` - optional custom OpenAI-compatible API base URL.
- `OPENAI_MODEL` - model name used for completions.
- `IMAGEKIT_PUBLIC_KEY` - ImageKit public key.
- `IMAGEKIT_PRIVATE_KEY` - ImageKit private key.
- `IMAGEKIT_URL_ENDPOINT` - ImageKit endpoint.

### Backend file-by-file guide

#### Entry and configuration

- [Backend/server.js](Backend/server.js) bootstraps the server and mounts routes.
- [Backend/config/db.js](Backend/config/db.js) handles MongoDB connection setup.
- [Backend/config/ai.js](Backend/config/ai.js) configures the OpenAI client using environment variables.
- [Backend/config/imageKit.js](Backend/config/imageKit.js) configures ImageKit credentials and client behavior.
- [Backend/config/multer.js](Backend/config/multer.js) configures file upload handling with Multer.

#### Controllers

- [Backend/Controller/userController.js](Backend/Controller/userController.js) manages registration, login, current-user data, and user resume listing.
- [Backend/Controller/resumeController.js](Backend/Controller/resumeController.js) manages resume creation, updating, deletion, retrieval, and public access.
- [Backend/Controller/aiController.js](Backend/Controller/aiController.js) manages AI-driven summary enhancement, job description enhancement, and resume text extraction.

#### Middleware

- [Backend/middlewares/authmiddleware.js](Backend/middlewares/authmiddleware.js) validates the JWT token and attaches the authenticated user id to the request.

#### Models

- [Backend/models/User.js](Backend/models/User.js) defines the user schema and password-related behavior.
- [Backend/models/Resume.js](Backend/models/Resume.js) defines the resume schema and stores all resume sections.

#### Routes

- [Backend/routes/userRoutes.js](Backend/routes/userRoutes.js) exposes user registration, login, current-user lookup, and user resume listing.
- [Backend/routes/resumeRoutes.js](Backend/routes/resumeRoutes.js) exposes resume creation, update, deletion, private fetch, and public fetch endpoints.
- [Backend/routes/aiRoutes.js](Backend/routes/aiRoutes.js) exposes AI content enhancement and resume upload/parsing endpoints.

### Backend API map

All routes are prefixed with `/api`.

#### `/api/users`

- `POST /register` - register a new account.
- `POST /login` - log in and receive a token.
- `GET /data` - return the current authenticated user.
- `GET /resumes` - return resumes belonging to the authenticated user.

#### `/api/resumes`

- `POST /create` - create a new blank resume.
- `PUT /update` - update an existing resume.
- `DELETE /delete/:resumeId` - delete a resume.
- `GET /get/:resumeId` - fetch a resume owned by the logged-in user.
- `GET /public/:resumeId` - fetch a resume in public mode.

#### `/api/ai`

- `POST /enhance-pro-sum` - improve a professional summary.
- `POST /enhance-job-desc` - improve a job description.
- `POST /upload-resume` - parse resume text and create structured resume data.

### Backend runtime behavior

- Authentication is token-based and protected routes expect the token in the request headers.
- Resume updates can include multipart image uploads.
- The backend can optionally remove the uploaded image background before saving it.
- AI responses are expected to return structured content that the controllers can use for editing or resume generation.

## Frontend

The frontend is a React single-page application built with Vite. It uses React Router for navigation, Redux Toolkit for auth state, Axios for API requests, and Tailwind CSS for styling.

### Frontend entrypoint

- [Frontend/src/main.jsx](Frontend/src/main.jsx) mounts the React app, wraps it in `BrowserRouter`, and provides the Redux store.
- [Frontend/src/App.jsx](Frontend/src/App.jsx) defines the route map and hydrates auth state from local storage on startup.

### Frontend package scripts

From [Frontend/package.json](Frontend/package.json):

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint across the frontend source.

### Frontend environment variables

Create [Frontend/.env](Frontend/.env) with:

- `VITE_BASE_URL` - backend base URL used by Axios, for example `http://localhost:3000` or your deployed API URL.

### Frontend file-by-file guide

#### App bootstrap and state

- [Frontend/src/main.jsx](Frontend/src/main.jsx) is the React root and app mount point.
- [Frontend/src/App.jsx](Frontend/src/App.jsx) manages app routes and initial auth restoration.
- [Frontend/src/app/store.js](Frontend/src/app/store.js) configures the Redux store.
- [Frontend/src/app/features/authSlice.js](Frontend/src/app/features/authSlice.js) stores token, user, and loading state for authentication.
- [Frontend/src/configs/api.js](Frontend/src/configs/api.js) creates the Axios client and points it to `VITE_BASE_URL`.

#### Pages

- [Frontend/src/pages/Home.jsx](Frontend/src/pages/Home.jsx) is the public landing page.
- [Frontend/src/pages/Login.jsx](Frontend/src/pages/Login.jsx) handles registration and login.
- [Frontend/src/pages/Layout.jsx](Frontend/src/pages/Layout.jsx) protects the app area and renders the navbar or login screen depending on auth state.
- [Frontend/src/pages/Dashboard.jsx](Frontend/src/pages/Dashboard.jsx) shows the resume dashboard and document management actions.
- [Frontend/src/pages/ResumeBuilder.jsx](Frontend/src/pages/ResumeBuilder.jsx) is the resume editing workspace with section navigation, template controls, save actions, sharing, visibility toggles, and download support.
- [Frontend/src/pages/Preview.jsx](Frontend/src/pages/Preview.jsx) renders a public resume preview page.

#### Core UI components

- [Frontend/src/components/Navbar.jsx](Frontend/src/components/Navbar.jsx) renders the main navigation bar.
- [Frontend/src/components/Loader.jsx](Frontend/src/components/Loader.jsx) shows a loading state.
- [Frontend/src/components/ResumePreview.jsx](Frontend/src/components/ResumePreview.jsx) renders the resume canvas preview.
- [Frontend/src/components/TemplateSelector.jsx](Frontend/src/components/TemplateSelector.jsx) lets the user switch resume templates.
- [Frontend/src/components/ColorPicker.jsx](Frontend/src/components/ColorPicker.jsx) lets the user change the accent color.

#### Resume form sections

- [Frontend/src/components/PersonalInfoForm.jsx](Frontend/src/components/PersonalInfoForm.jsx) edits personal details and profile image data.
- [Frontend/src/components/ProfessionSummaryForm.jsx](Frontend/src/components/ProfessionSummaryForm.jsx) edits the professional summary and AI-assisted summary content.
- [Frontend/src/components/ExperienceForm.jsx](Frontend/src/components/ExperienceForm.jsx) edits employment history.
- [Frontend/src/components/EducationFrom.jsx](Frontend/src/components/EducationFrom.jsx) edits education history. The filename uses "From" instead of "Form" in this repository.
- [Frontend/src/components/ProjectForm.jsx](Frontend/src/components/ProjectForm.jsx) edits project entries.
- [Frontend/src/components/SkillsForm.jsx](Frontend/src/components/SkillsForm.jsx) edits skills.

#### Home page sections

- [Frontend/src/components/home/Hero.jsx](Frontend/src/components/home/Hero.jsx) is the landing-page hero section.
- [Frontend/src/components/home/Banner.jsx](Frontend/src/components/home/Banner.jsx) renders a banner block for the homepage.
- [Frontend/src/components/home/CallToAction.jsx](Frontend/src/components/home/CallToAction.jsx) renders a call-to-action section.
- [Frontend/src/components/home/Features.jsx](Frontend/src/components/home/Features.jsx) describes product features.
- [Frontend/src/components/home/Footer.jsx](Frontend/src/components/home/Footer.jsx) renders the page footer.
- [Frontend/src/components/home/Testimonial.jsx](Frontend/src/components/home/Testimonial.jsx) renders testimonial content.
- [Frontend/src/components/home/Title.jsx](Frontend/src/components/home/Title.jsx) renders title or headline content for the homepage.

#### Template renderers

- [Frontend/src/components/templates/ClassicTemplate.jsx](Frontend/src/components/templates/ClassicTemplate.jsx) renders the classic resume layout.
- [Frontend/src/components/templates/MinimalTemplate.jsx](Frontend/src/components/templates/MinimalTemplate.jsx) renders a minimal resume layout.
- [Frontend/src/components/templates/MinimalImageTemplate.jsx](Frontend/src/components/templates/MinimalImageTemplate.jsx) renders a minimal layout with an image area.
- [Frontend/src/components/templates/ModernTemplate.jsx](Frontend/src/components/templates/ModernTemplate.jsx) renders the modern resume layout.

#### Asset bundle

- [Frontend/src/assets/assets.js](Frontend/src/assets/assets.js) centralizes asset exports and shared data.
- [Frontend/src/assets/templates/ClassicTemplate.jsx](Frontend/src/assets/templates/ClassicTemplate.jsx) is an asset-side template copy or alternate template implementation.
- [Frontend/src/assets/templates/MinimalTemplate.jsx](Frontend/src/assets/templates/MinimalTemplate.jsx) is an asset-side minimal template copy or alternate implementation.
- [Frontend/src/assets/templates/MinimalImageTemplate.jsx](Frontend/src/assets/templates/MinimalImageTemplate.jsx) is an asset-side minimal image template copy or alternate implementation.
- [Frontend/src/assets/templates/ModernTemplate.jsx](Frontend/src/assets/templates/ModernTemplate.jsx) is an asset-side modern template copy or alternate implementation.

### Frontend runtime behavior

- The app checks local storage for a token on load and restores the user session if the token is valid.
- The `app` route is protected by [Frontend/src/pages/Layout.jsx](Frontend/src/pages/Layout.jsx).
- Public resumes are viewable without logging in through the `/view/:resumeId` route.
- Resume editing is organized into sections so the user can move through personal info, summary, experience, education, projects, and skills one at a time.
- Resume preview changes immediately as the user edits the data and switches templates or colors.

## Nested Vite Scaffold

The folder [Frontend/vite-project/](Frontend/vite-project) looks like a separate Vite scaffold or leftover example app.

- [Frontend/vite-project/src/pages/Home.jsx](Frontend/vite-project/src/pages/Home.jsx) is another home page implementation.
- [Frontend/vite-project/src/components/home/Hero.jsx](Frontend/vite-project/src/components/home/Hero.jsx) is another hero component.

If this folder is not intentionally used, it can be reviewed separately so it does not confuse future contributors.

## Deployment

The repository includes deployment automation instead of a full local Compose stack.

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) automates deployment to an EC2 machine.
- `docker-compose.yml` at the root is currently part of the deployment flow.

If you are setting up a new environment, verify the deployment secrets and server-side paths before relying on this automation.

## Local Setup

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB accessible locally or remotely
- OpenAI or compatible AI credentials if you want the AI features to work
- ImageKit credentials if you want image upload features to work

### Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` with the backend variables listed above, then run:

```bash
npm run server
```

Use `npm run start` if you want the plain Node.js process instead of nodemon.

### Frontend setup

```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend/` with `VITE_BASE_URL`, then run:

```bash
npm run dev
```

### Typical development flow

1. Start MongoDB.
2. Start the backend.
3. Start the frontend.
4. Open the Vite URL in the browser.
5. Register or log in.
6. Create a resume from the dashboard.
7. Edit it in the builder and preview the result.

## File Structure Reference

This section is a compact map of the repository so someone can understand what each file is for at a glance.

```text
Backend/
├── Dockerfile - container build instructions for the backend
├── package.json - backend dependencies and scripts
├── server.js - Express server bootstrap and route mounting
├── config/
│   ├── ai.js - OpenAI client setup
│   ├── db.js - MongoDB connection helper
│   ├── imageKit.js - ImageKit client setup
│   └── multer.js - upload middleware configuration
├── Controller/
│   ├── aiController.js - AI enhancement and parsing handlers
│   ├── resumeController.js - resume CRUD and visibility handlers
│   └── userController.js - register, login, and user data handlers
├── middlewares/
│   └── authmiddleware.js - JWT protection middleware
├── models/
│   ├── Resume.js - resume schema
│   └── User.js - user schema
└── routes/
    ├── aiRoutes.js - AI routes
    ├── resumeRoutes.js - resume routes
    └── userRoutes.js - user routes

Frontend/
├── Dockerfile - container build instructions for the frontend
├── eslint.config.js - ESLint configuration
├── index.html - Vite HTML entry file
├── package.json - frontend dependencies and scripts
├── README.md - frontend-specific notes if any
├── vite.config.js - Vite configuration
├── public/ - static public assets
├── src/
│   ├── App.css - app-level styles
│   ├── App.jsx - app routes and auth bootstrap
│   ├── index.css - global CSS entry
│   ├── main.jsx - React app root
│   ├── app/
│   │   ├── store.js - Redux store configuration
│   │   └── features/
│   │       └── authSlice.js - auth state slice
│   ├── assets/
│   │   ├── assets.js - shared asset exports and data
│   │   └── templates/ - alternate or shared template implementations
│   ├── components/
│   │   ├── ColorPicker.jsx - accent color picker
│   │   ├── EducationFrom.jsx - education form section
│   │   ├── ExperienceForm.jsx - experience form section
│   │   ├── Loader.jsx - loading state
│   │   ├── Navbar.jsx - top navigation
│   │   ├── PersonalInfoForm.jsx - personal info form section
│   │   ├── ProfessionSummaryForm.jsx - summary form section
│   │   ├── ProjectForm.jsx - project form section
│   │   ├── ResumePreview.jsx - resume preview renderer
│   │   ├── SkillsForm.jsx - skills form section
│   │   ├── TemplateSelector.jsx - template picker
│   │   ├── home/ - landing page sections
│   │   └── templates/ - resume templates used in previews
│   ├── configs/
│   │   └── api.js - Axios client configuration
│   └── pages/
│       ├── Dashboard.jsx - authenticated resume dashboard
│       ├── Home.jsx - landing page
│       ├── Layout.jsx - protected layout wrapper
│       ├── Login.jsx - authentication page
│       ├── Preview.jsx - public resume preview
│       └── ResumeBuilder.jsx - resume editing workspace
└── vite-project/
    └── src/
        ├── components/home/Hero.jsx - alternate hero component
        └── pages/Home.jsx - alternate home page
```

## Notes and Caveats

- The backend default port in code is `3000`, not `5000`.
- There is no backend test suite yet.
- The root `docker-compose.yml` should be reviewed before using it as a local development Compose file.
- The nested `Frontend/vite-project/` folder may be legacy or experimental and should be checked before being treated as part of the main app.

## Troubleshooting

- If MongoDB connection fails, verify `MONGO_URI` and that the database is reachable.
- If login or protected routes fail, confirm the token is being sent in the request headers.
- If AI endpoints fail, verify `OPENAI_API_KEY`, `OPENAI_BASE_URL`, and `OPENAI_MODEL`.
- If image uploads fail, verify the ImageKit variables and the upload middleware configuration.
- If the frontend cannot reach the backend, confirm `VITE_BASE_URL` matches the backend address.

## License

This repository does not currently include a license file.
