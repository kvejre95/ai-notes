# AI Notes 📚🧠

AI-powered notes application built with Next.js, LangChain, Convex VectorDB, and an LLM, enabling PDF uploads, annotation, and real-time, context-aware Q&A using a multi-stage RAG pipeline.

## 🚀 Features

- 📄 Upload and store multiple PDFs
- 📝 Create and save notes per upload
- 🔍 Highlight text and get AI-powered answers
- 🤖 Multi-stage RAG (Retrieval-Augmented Generation) pipeline using internal VectorDB + DuckDuckGo
- 🧠 Built with a next-gen LLM and LangChain
- 💾 Convex used for both document and vector storage
- 🌐 Authentication handled by Clerk

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, TipTap Editor
- **Backend**: Convex, LangChain, Google Generative AI (Gemini)
- **AI & Retrieval**: LLM, VectorDB (Convex), DuckDuckGo Web Search
- **Auth**: Clerk
- **PDF Parsing**: pdf-parse

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/kvejre95/ai-notes.git
cd ai-notes
