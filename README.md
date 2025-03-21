# 🧠 AI Notes

AI Notes is an AI-powered notes application that enables users to upload PDFs, create and save notes per file, and interact with an intelligent assistant for context-aware Q&A using a multi-stage Retrieval-Augmented Generation (RAG) pipeline. It combines internal document search (Convex VectorDB), external search (DuckDuckGo), and LLM reasoning to deliver real-time, summarized insights.

---

## 🚀 Features

- **Multiple PDF Uploads**: Upload and organize multiple PDFs, each with its own notes.  
- **Context-Aware Q&A**: Highlight text and invoke AI to answer questions with relevant context.  
- **Multi-Stage RAG Pipeline**: Combines internal vector search, external data (DuckDuckGo), and LLM for high-quality responses.  
- **Persistent Notes**: Save and access your notes at any time within the application.  
- **User Authentication**: Easily manage sign-ups/logins (via Clerk).  
- **Modern UI/UX**: Built on Next.js, React, Tailwind CSS, and TipTap editor.

---

## 🛠 Tech Stack

| Layer           | Technology                                                               |
|-----------------|---------------------------------------------------------------------------|
| **Frontend**    | Next.js, React, Tailwind CSS, TipTap Editor                              |
| **Backend**     | Convex (as DB + VectorDB), LangChain                                     |
| **AI / RAG**    | LLM (Google Gemini via `@google/generative-ai`), multi-stage pipeline     |
| **Search**      | DuckDuckGo (via `duck-duck-scrape`)                                      |
| **Auth**        | Clerk                                                                    |
| **PDF Parsing** | pdf-parse                                                                |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kvejre95/ai-notes.git
cd ai-notes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables
Create a .env.local file in the project root and add the following keys:
```env
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_generative_ai_api_key
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Convex Run

```bash
npx convex dev
```
This spins up Convex in development mode. For production, deploy your Convex project and set NEXT_PUBLIC_CONVEX_URL accordingly.

### 5. Run the Application

```bash
npm run dev
```
