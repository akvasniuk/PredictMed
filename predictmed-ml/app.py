from fastapi import FastAPI
from fastapi import File, UploadFile
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

import uvicorn

import numpy as np

app = FastAPI()

@app.get("/ping")
def root():
    return "pong"

@app.post("/predict")
async def predict(file: UploadFile=File(...)):
    print(file)


    return {"prediction": "This is a dog"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)