import os
import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types

api_key_from_render = os.environ.get("API_KEY")
if not api_key_from_render:
    print("CRITICAL ERROR: API_KEY not found in environment variables!")
client = genai.Client(api_key=api_key_from_render)

model_name = "gemini-2.5-flash"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://dissent-ofc.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Server is running! Send a PDF to /analyze"}

@app.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        content = await file.read()

        prompt = """
        You are an expert document analyzer. 
        1. Summarize the main purpose of this document.
        2. Extract key insights or data points.
        3. Identify any immediate action items or conclusions.
        Format the output in clean Markdown.
        """

        response = client.models.generate_content(
            model=model_name,
            contents=[
                types.Part.from_bytes(
                    data=content,
                    mime_type='application/pdf'
                ),
                prompt
            ]
        )

        return {"analysis": response.text}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)