from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.alzheimer_model import alzheimer_model

alzheimer_router = APIRouter()

class InputData(BaseModel):
    gender: int
    age: int
    educ: int
    ses: int
    mmse: int
    etiv: int
    nwbv: float
    asf: float
    

@alzheimer_router.post("/predict")
def predict_alzheimer(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]

        prediction = alzheimer_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))