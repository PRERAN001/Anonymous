# 🕵️ Anonymous — Anonymous Messaging Platform

> **Live Demo:** [https://anonymous-henna.vercel.app/](https://anonymous-henna.vercel.app/)

> **⚠️ Note:** You may not receive the OTP verification email due to domain/email delivery issues on the free Resend tier. If this happens, try again or contact the project owner.

---

Anonymous is a full-stack anonymous social messaging web application. Users can create a profile, share a unique public link, and receive honest, anonymous messages from anyone — no account required to send. Inspired by platforms like Qooh.me, it combines a clean UI with AI-powered conversation suggestions.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Getting Started (Local Development)](#-getting-started-local-development)
- [Deployment](#-deployment)

---

## ✨ Features

- 🔐 **Email-based Registration** — Sign up with a username, email, and password
- 📧 **OTP Email Verification** — 6-digit one-time password sent via Resend; expires in 1 hour
- 🔑 **Secure Authentication** — NextAuth.js with JWT strategy; passwords hashed using bcryptjs
- 📬 **Anonymous Messaging** — Anyone can send a message to a user's public profile without logging in
- 🎛️ **Accept/Reject Toggle** — Users can turn anonymous message acceptance on or off from their dashboard
- 📊 **Dashboard** — View all received messages, copy your unique link, and manage settings
- 🤖 **AI Suggestions** — OpenRouter AI generates three conversation-starter prompts for senders
- 🔄 **Real-time Username Check** — Debounced availability check during sign-up
- 📱 **Responsive UI** — Mobile-first design built with Tailwind CSS and shadcn/ui components
- 🍞 **Toast Notifications** — Instant feedback for all user actions via Sonner

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router and API Routes |
| [React 19](https://react.dev/) | UI rendering |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Pre-built accessible UI components (Button, Card, Input, Switch, Carousel, etc.) |
| [Radix UI](https://www.radix-ui.com/) | Headless component primitives (used internally by shadcn/ui) |
| [React Hook Form](https://react-hook-form.com/) | Performant form state management |
| [Zod](https://zod.dev/) | Schema-based form validation |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Embla Carousel](https://www.embla-carousel.com/) | Touch-friendly carousel for the landing page |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notification system |
| [next-themes](https://github.com/pacocoursey/next-themes) | Light/dark theme support |
| [Axios](https://axios-http.com/) | HTTP client for API calls |

### Backend / API
| Technology | Purpose |
|---|---|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | Serverless API endpoints |
| [MongoDB](https://www.mongodb.com/) | NoSQL database for users and messages |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM for schema definitions and queries |
| [NextAuth.js v4](https://next-auth.js.org/) | Authentication (Credentials Provider + JWT) |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing (10 salt rounds) |
| [Resend](https://resend.com/) | Transactional email delivery for OTP emails |
| [react-email](https://react.email/) | HTML email template authoring in React |
| [OpenRouter AI](https://openrouter.ai/) | LLM API for AI-generated message suggestions (`stepfun/step-3.5-flash` model) |

### Development & Tooling
| Technology | Purpose |
|---|---|
| [TypeScript 5](https://www.typescriptlang.org/) | Static type checking |
| [ESLint 9](https://eslint.org/) | Code linting |
| [PostCSS](https://postcss.org/) | CSS processing (required by Tailwind v4) |

---

## 📁 Project Structure

```
Anonymous/
├── app/
│   ├── (app)/                        # Protected routes (requires auth)
│   │   ├── dashboard/
│   │   │   └── page.tsx              # User dashboard — messages, link, settings
│   │   ├── layout.tsx                # Layout wrapper for protected pages
│   │   └── page.tsx                  # Landing/home page with message carousel
│   ├── (auth)/                       # Public authentication routes
│   │   ├── sign-up/page.tsx          # Registration form
│   │   ├── sign-in/page.tsx          # Login form
│   │   └── verify/[username]/        # OTP verification
│   │       └── page.tsx
│   ├── u-anonymous/[username]/       # Public profile (send anonymous message)
│   │   └── page.tsx
│   ├── api/                          # Serverless API route handlers
│   │   ├── auth/[...nextauth]/       # NextAuth configuration and handler
│   │   ├── sign-up/route.ts          # POST — register user, send OTP
│   │   ├── verify/route.ts           # POST — verify OTP code
│   │   ├── check-username-unique/    # GET  — check username availability
│   │   ├── send-message/route.ts     # POST — send anonymous message
│   │   ├── get-messages/route.ts     # GET  — fetch authenticated user's messages
│   │   ├── accept-message/route.ts   # GET/POST — manage accept-message toggle
│   │   └── suggest-msgs/route.ts     # POST — AI-generated message suggestions
│   ├── model/
│   │   └── User.ts                   # Mongoose User model + Message sub-document
│   ├── schema/                       # Zod validation schemas (username, email, message, etc.)
│   ├── email/
│   │   └── VerificationEmail.tsx     # React Email OTP email template
│   ├── helpers/
│   │   └── sendvericficationemail.ts # Helper to send OTP email via Resend
│   ├── lib/
│   │   ├── dbConnection.ts           # MongoDB connection helper (singleton pattern)
│   │   └── resend.ts                 # Resend client instance
│   ├── types/
│   │   ├── Apiresponse.ts            # Shared API response type
│   │   └── next-auth.d.ts            # NextAuth session type augmentation
│   ├── context/
│   │   └── Authprovider.tsx          # NextAuth SessionProvider context
│   ├── layout.tsx                    # Root layout (fonts, providers, toaster)
│   └── provider.tsx                  # SessionProvider wrapper component
├── components/
│   ├── ui/                           # shadcn/ui generated components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── form.tsx
│   │   ├── switch.tsx
│   │   ├── carousel.tsx
│   │   ├── alert-dialog.tsx
│   │   └── sonner.tsx
│   ├── Navbar.tsx                    # Top navigation bar
│   └── Messagecard.tsx               # Individual message card component
├── lib/
│   └── utils.ts                      # Tailwind class merge utility (cn)
├── public/                           # Static assets
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

---

## 🗄️ Database Schema

The application uses a single **MongoDB** collection (`users`). Messages are embedded as a sub-document array within each user document.

### User Document
```typescript
{
  username:           string    // Unique, 3–20 chars, alphanumeric + underscore
  email:              string    // Unique, validated email address
  password:           string    // bcrypt-hashed password
  verifycode:         string    // 6-digit OTP for email verification
  verifycodeexpiry:   Date      // OTP expiry timestamp (1 hour from registration)
  isverified:         boolean   // true after OTP is confirmed (default: false)
  isacceptingmessage: boolean   // Whether user accepts new messages (default: false)
  messages:           Message[] // Embedded array of received messages
}
```

### Message Sub-document
```typescript
{
  content:   string  // Message text (max 500 characters)
  createdat: Date    // Timestamp of when the message was sent
}
```

---

## 🔌 API Endpoints

All API routes are located under `/api/`.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/[...nextauth]` | — | NextAuth credentials sign-in |

### User Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/sign-up` | — | Register a new user and send OTP email |
| `POST` | `/api/verify` | — | Verify the OTP and activate the account |
| `GET` | `/api/check-username-unique?username=<name>` | — | Check if a username is available |

### Messaging Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/send-message` | — | Send an anonymous message to a user |
| `GET` | `/api/get-messages` | ✅ JWT | Fetch all messages for the logged-in user |
| `GET` | `/api/accept-message` | ✅ JWT | Get current accept-message status |
| `POST` | `/api/accept-message` | ✅ JWT | Toggle accept-message on/off |

### AI Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/suggest-msgs` | — | Get 3 AI-generated conversation starters |

---

## 🔐 Authentication Flow

1. **Sign Up** — User registers with username, email, and password
2. **OTP Email** — A 6-digit code is sent to the user's email via Resend (expires in 1 hour)
3. **Verification** — User enters the OTP on the `/verify/[username]` page
4. **Sign In** — NextAuth Credentials provider validates email + password and checks `isverified`
5. **JWT Session** — A signed JWT token is issued containing: `id`, `username`, `isacceptingmessage`, `isverified`
6. **Protected Routes** — API routes extract and validate the JWT token using `getToken()` from next-auth/jwt

---

## 🌍 Environment Variables

Create a `.env` file in the project root (`Anonymous/`) with the following variables:

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# NextAuth
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:3000

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# OpenRouter AI
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas (or local) connection string |
| `NEXTAUTH_SECRET` | Secret used to sign/encrypt JWTs — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL of your app (set to your domain in production) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) for sending emails |
| `OPENROUTER_API_KEY` | API key from [openrouter.ai](https://openrouter.ai) for AI suggestions |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)
- A [Resend](https://resend.com) account and API key
- An [OpenRouter](https://openrouter.ai) account and API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/PRERAN001/Anonymous.git
cd Anonymous/Anonymous

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start the development server (with hot reload)
npm run build    # Build the application for production
npm run start    # Start the production server
npm run lint     # Run ESLint
```

---

## ☁️ Deployment

The project is deployed on **Vercel**.

**Live URL:** [https://anonymous-henna.vercel.app/](https://anonymous-henna.vercel.app/)

To deploy your own instance:

1. Push your code to a GitHub repository
2. Import the project on [Vercel](https://vercel.com/new)
3. Set the **Root Directory** to `Anonymous` (the inner folder)
4. Add all required [environment variables](#-environment-variables) in the Vercel project settings
5. Deploy!

> **⚠️ OTP Note:** You may not receive the OTP verification email due to domain/email delivery restrictions on the free Resend tier (emails can only be sent to verified addresses unless a custom domain is configured). If this happens, verify your email address in the Resend dashboard or upgrade to a paid plan with a custom domain.

---

## 📸 Pages Overview

| Page | URL | Description |
|---|---|---|
| Landing | `/` | Hero section with sample message carousel |
| Sign Up | `/sign-up` | Register with username, email, password |
| Sign In | `/sign-in` | Log in with email and password |
| Verify | `/verify/[username]` | Enter OTP to activate account |
| Public Profile | `/u-anonymous/[username]` | Send an anonymous message |
| Dashboard | `/dashboard` | View messages, manage settings |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
