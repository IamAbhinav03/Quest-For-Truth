import csv
import random
import json
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware


def get_questions():
    data = []
    with open("data.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data


app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "https://iamabhinav03.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def welcome():
    return "Welcome to quest for truth api"


@app.get("/questions/")
async def read_questions(
    num_questions: int = Query(default=10, description="Number of questions to return")
):
    questions = random.sample(get_questions(), num_questions)
    # questions_json = json.dumps(questions)
    return questions
