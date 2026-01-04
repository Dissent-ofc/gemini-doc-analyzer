# Gemini Doc Analyzer

Gemini Doc Analyzer is a modern, AI-powered document analysis tool that transforms static PDF files into clear, structured, and actionable insights. It leverages the multimodal reasoning capabilities of **multimodal AI** to understand documents visually rather than relying on traditional OCR alone.

Built with **React** on the frontend and **FastAPI** on the backend, the application delivers fast, accurate, and visually rich document summaries in seconds.

---

## Overview

Unlike conventional OCR-based tools that often break on complex layouts, Gemini Doc Analyzer processes PDFs as visual documents. This allows it to accurately interpret:

- Tables and structured data  
- Charts and diagrams  
- Multi-column layouts  
- Rich formatting and headings  

The result is a clean, readable Markdown summary that highlights key insights, important data points, and actionable items.

---

## Key Features

### Instant Document Analysis
Upload a PDF and receive a comprehensive, structured summary within seconds.

### Intelligent Insight Extraction
Automatically identifies:
- Key takeaways  
- Action items  
- Important metrics and data points  

### Modern User Interface
A clean, glassmorphism-inspired interface with smooth animations and a focus on readability and usability.

### Markdown-Based Output
All results are rendered as Markdown, making them easy to:
- Read  
- Copy  
- Share  
- Export to other tools  

### Privacy-First Design
- Files are processed entirely in memory  
- No PDFs are permanently stored on the server  

---

## Tech Stack

### Frontend
- **Framework:** React 18 (via Vite)  
- **Styling:** Custom CSS (glassmorphism design and animations)  
- **HTTP Client:** : Axios  
- **Markdown Rendering:** :react-markdown  

### Backend
- **Framework:** FastAPI (Python)
- **ASGI Server:** Uvicorn  
- **AI Model:** Google gemini-2.5-flash  
- **SDK:** google-genai (2026 Standard)

---

## How It Works

1. The user uploads a PDF through the web interface.  
2. The backend processes the file in memory and sends it to Gemini for multimodal analysis.  
3. Gemini interprets the document visually, understanding layout and structure.  
4. The application returns a clean Markdown summary with key insights and highlights.

---

## Use Cases

- Business reports and financial documents  
- Research papers and academic PDFs  
- Legal and policy documents  
- Product specs and technical documentation  

---

## License

This project is provided for educational and experimental purposes.  
Refer to the license file for usage and distribution terms.
