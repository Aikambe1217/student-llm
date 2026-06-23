from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import logging
import datetime

from Backend.llm_client import ask_llm
from Backend.config import LOG_FILE


# ---------------------------
# Logging Setup
# ---------------------------
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


# ---------------------------
# FastAPI App Initialization
# ---------------------------
app = FastAPI(title="Student Support Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://192.168.1.193:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# System Prompt
# ---------------------------
SYSTEM_PROMPT = """
You are a helpful University Student Support Assistant.

You assist students with:
- Course registration
- Examination rules
- Library services
- ICT support
- Hostel application
- Fee payment
- Academic calendar
- Student conduct

Respond clearly, politely, and professionally.
If you are unsure, clearly say you don't know.
"""


# ---------------------------
# Request Model
# ---------------------------
class Question(BaseModel):
    question: str


# ---------------------------
# Health Check Endpoint
# ---------------------------
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "timestamp": str(datetime.datetime.now())
    }


# ---------------------------
# Ask Endpoint
# ---------------------------
@app.post("/ask")
async def ask_question(body: Question):
    # Validate input
    if not body.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    # Build prompt
    full_prompt = f"{SYSTEM_PROMPT}\n\nStudent: {body.question}\nAssistant:"

    try:
        logging.info(f"Received question: {body.question}")

        # Call LLM
        answer = await ask_llm(full_prompt)

        logging.info(f"Generated answer: {answer[:100]}...")

        return {
            "question": body.question,
            "answer": answer
        }

    except Exception as e:
        logging.error(f"LLM error: {str(e)}")

        raise HTTPException(
            status_code=503,
            detail="LLM service unavailable. Please try again later."
        )
    

# get history of questions and answers 
@app.get("/history")
async def get_history():
    history = []

    with open(LOG_FILE, "r") as f:
        for line in f:
            if "Received question:" in line:
                question = line.split("Received question:")[1].strip()

                history.append({
                    "title": question
                })

    return history[-20:]