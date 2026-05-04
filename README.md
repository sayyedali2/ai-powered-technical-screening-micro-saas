# 🚀 TechScreen AI

**Instant Technical Screening Questions powered by Google Gemini API.**

TechScreen AI is a lightweight, high-performance Micro-SaaS designed to help HR professionals, recruiters, and busy startup founders generate high-quality, conceptual technical interview questions in seconds. 

Built with a focus on **MVP (Minimum Viable Product)** principles, this tool demonstrates how AI can be integrated into a decoupled architecture to solve real-world hiring bottlenecks.

---

## 🌟 Key Features
- **Smart Prompting:** Uses System Prompting to extract tech stacks from messy user inputs.
- **Conceptual Depth:** Generates 5 deep-dive technical questions rather than basic syntax queries.
- **Clean UI/UX:** A minimalist interface built for speed and efficiency.
- **AI Guardrails:** Backend logic to ensure responses stay focused on technical screening.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **MUI** (for rapid styling)

### Backend
- **NestJS** (Modular Architecture)
- **TypeScript**
- **REST API**
- **Google Gemini AI SDK**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Google AI Studio API Key (Gemini)

### Installation

## Server:
cd server
npm install
# Create a .env file and add your GEMINI_API_KEY
npm run start:dev

## Client:
cd client
npm install
npm run dev
