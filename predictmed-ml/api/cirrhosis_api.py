from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.cirrhosis_model import cirrhosis_model

cirrhosis_router = APIRouter()

class InputData(BaseModel):
    stage: int
    age_elderly: int
    ascites: int
    hepatomegaly: int
    spiders: int
    edema: int
    bilirubin_high: int
    copper_high: float
    prothrombin_normal: float
    

@cirrhosis_router.post("/predict")
def predict_cirrhosis(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]

        prediction = cirrhosis_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))