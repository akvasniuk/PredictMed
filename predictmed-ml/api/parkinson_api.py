from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.parkinson_model import parkinson_model

parkinson_router = APIRouter()

class InputData(BaseModel):
    fo: int
    fhi: int
    flo: int
    jitter_percent: int
    jitter_abs: int
    rap: float
    ppq: float
    ddp: float
    shimmer: float
    shimmer_dB: float
    apq3: float
    apq5: float
    apq: float
    dda: float
    nhr: float
    hnr: float
    rpde: float
    dfa: float
    spread1: int
    spread2: int
    d2: int
    ppe: int
    

@parkinson_router.post("/predict")
def predict_diabetes(data: InputData):
    try:
        # Convert InputData object to a dictionary
        input_data_dict = data.dict()

        # Create the user_input list
        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        # Convert user_input to floats
        user_input = [float(x) for x in user_input]

        # Use the input data to make predictions with the diabetes model
        prediction = parkinson_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        # Handle errors and return a meaningful response
        raise HTTPException(status_code=500, detail=str(e))