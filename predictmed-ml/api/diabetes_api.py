from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.diabetes_model import diabetes_model

diabetes_router = APIRouter()

class InputData(BaseModel):
    pregnancies: int
    plucose: int
    bloodPressure: int
    skinThickness: int
    insulin: int
    bmi: float
    diabetesPedigreeFunction: float
    age: int

@diabetes_router.post("/predict")
def predict_diabetes(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]

        prediction = diabetes_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))