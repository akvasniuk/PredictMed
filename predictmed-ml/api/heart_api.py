from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.heart_model import heart_model

heart_router = APIRouter()

class InputData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@heart_router.post("/predict")
def predict_diabetes(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]
        
        prediction = heart_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))