from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.kidney_model import kidney_model

kidney_router = APIRouter()

class InputData(BaseModel):
    age: int
    bp: int
    sg: float
    al: int
    su: int
    pcc: int
    ba: int
    bgr: int
    bu: int
    sc: float
    hemo: float
    htn: int
    dm: int
    cad: int
    appet: int
    pe: int
    ane: int

@kidney_router.post("/predict")
def predict_kidney(data: InputData):
    try:
        input_data_dict = data.dict()

        user_input = [input_data_dict[field] for field in InputData.__annotations__]

        user_input = [float(x) for x in user_input]
        
        prediction = kidney_model.predict([user_input])

        return {"prediction": int(prediction[0])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))