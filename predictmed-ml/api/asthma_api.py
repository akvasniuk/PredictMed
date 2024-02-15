from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.asthma_model import asthma_model

asthma_router = APIRouter()

class InputData(BaseModel):
    tiredness: int
    dry_cough: int
    none_symptom: int
    pains: int
    nasal_congestion: int
    none_experiening: int
    age_0_9: int
    age_10_19: int
    age_20_24: int
    age_25_59: int
    age_60_more: int
    gender_female: int
    gender_male: int
    severity_mild: int
    severity_moderate: int
    severity_none: int


@asthma_router.post("/predict")
def predict_asthma(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]

        prediction = asthma_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))