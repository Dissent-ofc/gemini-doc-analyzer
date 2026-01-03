📄 Gemini Doc Analyzer

A modern, AI-powered document analysis tool that transforms static PDFs into instant, actionable insights. Built with React, FastAPI, and Google Gemini 2.5.
🚀 Overview

Gemini Doc Analyzer leverages the multimodal capabilities of Google's Gemini 2.5 Flash model to "read" PDF documents visually. Unlike traditional OCR tools that struggle with layouts, this application understands charts, tables, and complex formatting instantly, providing structured summaries in seconds.
✨ Key Features

    ⚡ Instant Analysis: Upload any PDF and get a comprehensive summary in seconds.

    🧠 Intelligent Extraction: Automatically identifies key insights, action items, and data points.

    🎨 Glassmorphism UI: A stunning, modern interface featuring animated gradients and frosted glass effects.

    📝 Markdown Rendering: Outputs clean, formatted text with bolding, lists, and headers.

    🔒 Secure & Private: Files are processed in memory and never permanently stored on the server.

🛠️ Tech Stack
Frontend

    Framework: React 18 (via Vite)

    Styling: Custom CSS (Glassmorphism & Animations)

    HTTP Client: Axios

    Markdown: react-markdown

Backend

    Framework: FastAPI (Python)

    Server: Uvicorn

    AI Model: Google gemini-2.5-flash

    SDK:google-genai (Latest 2026 Standard)