# Medical AI Voice Agent 🩺🎙️

This is a Next.js web application built with App Router and bootstrapped using create-next-app.

The project focuses on delivering an AI-powered medical voice assistant experience, allowing users to interact with AI doctor agents, manage medical sessions, and access personalized dashboards with secure authentication and billing.

## 🚀 Features

### 🤖 AI Medical Voice Agent

- **Voice-based interaction with AI-powered medical assistants
- **Session-based medical conversations

### 👨‍⚕️ AI Doctor Agent Dashboard

- **Browse and interact with multiple AI specialist doctors
- **Session history and medical reports

### 🔐 Authentication & Billing

- **Secure authentication using Clerk
- **Subscription & billing support (Stripe via Clerk Billing)

### 📊 User Dashboard

- **Medical session history
- **Billing management

### ⚡ Modern Tech Stack

- **Next.js 16 (App Router)
- **Tailwind CSS
- **API Routes
- **Optimized fonts with next/font (Geist)

### 🖥️ Frontend

- **Framework: Next.js
- **UI: React Server & Client Components
- **Styling: Tailwind CSS
- **State: React hooks & server actions
- **Fully Responsiveness

### 🔐 Authentication & Authorization

- **Provider: Clerk
- **JWT-based authentication
- **Route protection via middleware

### ⚙️ Backend / API 

- **Built-in Next.js Route Handlers
- **Serverless APIs
- **Secure access using Clerk sessions

### 🗄️ Database

- **Database: PostgreSQL (Neon) (Drizzle)

### 🤖 AI Architecture

### Text AI :

- **Provider: OpenRouter & Assembly AI
- **LLM-based medical conversation
- **Context-aware 

### Voice AI :

- **Provider: Vapi AI & Assembly AI
- **Real-time voice input/output
- **Voice assistant session lifecycle

### 💳 Billing (Developer Mode)

- **Clerk Billing
- **Developer Mode
- **Subscription-based access
- **Production-ready billing flow

## 🏗️ System Architecture

The Medical AI Voice Agent follows a modern full-stack, modular architecture built on Next.js App Router, combining frontend, backend APIs, authentication, billing, and AI services in a single scalable application.

## 🛠️ Getting Started 

First, install dependencies:

npm install

Key's example structure include in .env.example 

You want to create .env file first and input your own created key's

Run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 in your browser to see the application.

You can start editing the main page by modifying:

app/page.tsx

The app supports hot reload, so changes appear instantly.

## 🧱 Project Structure (Overview)

- **app/ – App Router pages and layouts
- **app/api/ – Backend API routes
- **components/ – Reusable UI components
- **shared/ – Shared constants and lists
- **lib/ – Utility functions and integrations

## 📚 Learn More 

To learn more about the technologies used, check out:

- **Next.js Documentation
- **Next.js App Router
- **Clerk Authentication
- **Vercel Platform
- **Vapi AI
- **Open Router
- **Assembly AI

## 🌐 Deployment

The easiest way to deploy this Next.js application is using Vercel, the creators of Next.js.

1. Push the project to GitHub

2. Import the repository into Vercel

3. Configure environment variables

### Deploy 🚀 

- **For more details, see:

* Next.js Deployment Documentation

- **Deploy: Vercel
- **CI/CD: GitHub → Vercel

- **Environment separation: Development , Production

## 🔐 Environment Variables

Make sure to configure required environment variables for:

- **Clerk Authentication

- **Database (PostgreSQL / Neon / Drizzle)

- **AI services

- **Billing (Clerk - Developer Mode)

* ⚠️ Never commit secret keys to your repository.

* Key's example structure include .env.example

* You want to create .env file first

## 📄 License

- **This project is for educational and development purposes

* Built with ❤️ using Next.js and modern web technologies.

* Built by ❤️ Rukshan Ekanayake
