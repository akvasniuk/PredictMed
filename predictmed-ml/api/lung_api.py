from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.lung_model import lung_model

lung_router = APIRouter()

class InputData(BaseModel):
    age: int
    smokes: int
    areaQ: int
    alkohol: int
    

@lung_router.post("/predict")
def predict_lung(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]

        prediction = lung_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))