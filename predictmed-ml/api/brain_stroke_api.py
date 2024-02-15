from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.brain_stroke_model import brain_stroke_model

brain_stroke_router = APIRouter()

class InputData(BaseModel):
    gender: int
    age: int
    hypertension: int
    heart_disease: int
    work_type: int
    residence_type: int
    avg_glucose_level: int
    bmi: float
    smoking_status: float
    

@brain_stroke_router.post("/predict")
def predict_brain_stroke(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]

        prediction = brain_stroke_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))