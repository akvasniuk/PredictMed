from fastapi import APIRouter
from api.diabetes_api import diabetes_router
from api.heart_api import heart_router
from api.parkinson_api import parkinson_router
from api.brain_stroke_api import brain_stroke_router
from api.cirrhosis_api import cirrhosis_router
from api.alzheimer_api import alzheimer_router
from api.lung_api import lung_router
from api.kidney_api import kidney_router
from api.asthma_api import asthma_router

api_router = APIRouter()
api_router.include_router(diabetes_router, prefix="/diabetes", tags=["diabetes"])
api_router.include_router(heart_router, prefix="/heart", tags=["heart"])
api_router.include_router(parkinson_router, prefix="/parkinson", tags=["parkinson"])
api_router.include_router(brain_stroke_router, prefix="/brain_stroke", tags=["brain_stroke"])
api_router.include_router(cirrhosis_router, prefix="/cirrhosis", tags=["cirrhosis"])
api_router.include_router(alzheimer_router, prefix="/alzheimer", tags=["alzheimer"])
api_router.include_router(lung_router, prefix="/lung", tags=["lung"])
api_router.include_router(asthma_router, prefix="/asthma", tags=["asthma"])