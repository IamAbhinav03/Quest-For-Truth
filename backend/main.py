import csv
import random
import json
from fastapi import FastAPI, Query

def get_questions():
    data = []
    with open("data.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

app = FastAPI()

@app.get("/")
async def welcome():
    return "Welcome to quest for truth api"

@app.get("/questions/")
async def read_questions(
    num_questions: int = Query(default=10, description="Number of questions to return")
):
    data = get_questions()
    questions = random.sample(get_questions(), num_questions)
    questions_json = json.dumps(questions)
    return data[:num_questions]
