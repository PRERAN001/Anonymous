# Anonymous — Anonymous Messaging Platform

> Live Demo: https://anonymous-henna.vercel.app



---

Anonymous is a full-stack anonymous social messaging web application. Users can create a profile, share a unique public link, and receive honest anonymous messages from anyone — no account required to send. Inspired by platforms like Qooh.me, it combines a clean UI with AI-powered conversation suggestions.

---

# Table of Contents

- Features
- Tech Stack
- Project Structure
- Database Schema
- API Endpoints
- Environment Variables
- Getting Started (Local Development)
- Deployment

---

# Features

- Email-based Registration
- OTP Email Verification
- Secure Authentication
- Anonymous Messaging
- Accept/Reject Toggle
- Dashboard for managing messages
- AI-generated conversation suggestions
- Real-time username availability check
- Responsive UI
- Toast notifications

---

# Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework with App Router and API Routes |
| React 19 | UI rendering |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI components |
| Radix UI | Headless component primitives |
| React Hook Form | Form management |
| Zod | Schema validation |
| Lucide React | Icons |
| Embla Carousel | Carousel |
| Sonner | Toast notifications |
| next-themes | Theme support |
| Axios | HTTP requests |

---

## Backend / API

| Technology | Purpose |
|---|---|
| Next.js API Routes | API endpoints |
| MongoDB | Database |
| Mongoose | ODM |
| NextAuth.js v4 | Authentication |
| bcryptjs | Password hashing |
| ezymail | SMTP email delivery |
| react-email | Email template rendering |
| OpenRouter AI | AI-generated message suggestions |

---

## Development & Tooling

| Technology | Purpose |
|---|---|
| TypeScript 5 | Type safety |
| ESLint 9 | Linting |
| PostCSS | CSS processing |

---

# Project Structure

```txt
Anonymous/
├── app/
├── components/
├── lib/
├── public/
├── package.json
└── ...
```

---

# Database Schema

## User Document

```ts
{
  username: string
  email: string
  password: string
  verifycode: string
  verifycodeexpiry: Date
  isverified: boolean
  isacceptingmessage: boolean
  messages: Message[]
}
```

## Message Sub-document

```ts
{
  content: string
  createdat: Date
}
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/[...nextauth]` | User sign in |

---

## User Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/sign-up` | Register user and send OTP |
| POST | `/api/verify` | Verify OTP |
| GET | `/api/check-username-unique` | Check username availability |

---

## Messaging Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/send-message` | Send anonymous message |
| GET | `/api/get-messages` | Fetch user messages |
| GET | `/api/accept-message` | Get accept-message status |
| POST | `/api/accept-message` | Toggle accept-message setting |

---

## AI Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/suggest-msgs` | Generate AI message suggestions |

---

# Authentication Flow

1. User signs up with username, email, and password
2. OTP email is sent using ezymail
3. User verifies OTP
4. User signs in with NextAuth
5. JWT session is generated
6. Protected routes validate JWT tokens

---

# Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

OPENROUTER_API_KEY=your_openrouter_key

EZYMAIL_API_URL=https://your-ezymail-api-url
```

---

# Getting Started

## Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas or local MongoDB
- OpenRouter API key
- ezymail API server running

---

## Installation

```bash
git clone https://github.com/PRERAN001/Anonymous.git

cd Anonymous

npm install
```

---

## Configure Environment Variables

```bash
cp .env.example .env
```

Update `.env` with your credentials.

---

## Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

# Deployment

The frontend is deployed on Vercel.

To deploy:

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables
4. Deploy



---

# Pages Overview

| Page | URL | Description |
|---|---|---|
| Landing | `/` | Home page |
| Sign Up | `/sign-up` | Registration page |
| Sign In | `/sign-in` | Login page |
| Verify | `/verify/[username]` | OTP verification |
| Public Profile | `/u-anonymous/[username]` | Anonymous message page |
| Dashboard | `/dashboard` | User dashboard |

---

# Contributing

Pull requests are welcome.

---

# License

MIT