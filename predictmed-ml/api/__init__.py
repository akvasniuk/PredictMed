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
from api.lung_colon_api import lung_colon_router
from api.disease_api import disease_router
from api.multi_disease_api import multi_disease_router
from api.skin_diseases_api import skin_diseases_router
from api.skin2_diseases_api import skin2_diseases_router
from api.skin3_diseases_api import skin3_diseases_router
from api.okular_api import okular_router
from api.alzheimer_img_api import alzheimer_router
from api.x_ray_api import x_ray_router
from api.malaria_api import malaria_router

api_router = APIRouter()
api_router.include_router(diabetes_router, prefix="/diabetes", tags=["diabetes"])
api_router.include_router(heart_router, prefix="/heart", tags=["heart"])
api_router.include_router(parkinson_router, prefix="/parkinson", tags=["parkinson"])
api_router.include_router(brain_stroke_router, prefix="/brain_stroke", tags=["brain_stroke"])
api_router.include_router(cirrhosis_router, prefix="/cirrhosis", tags=["cirrhosis"])
api_router.include_router(alzheimer_router, prefix="/alzheimer", tags=["alzheimer"])
api_router.include_router(lung_router, prefix="/lung", tags=["lung"])
api_router.include_router(kidney_router, prefix="/kideny", tags=["kidney"])
api_router.include_router(asthma_router, prefix="/asthma", tags=["asthma"])
api_router.include_router(lung_colon_router, prefix="/lung_colon", tags=["lung_colon"])
api_router.include_router(disease_router, prefix="/disease", tags=["disease"])
api_router.include_router(multi_disease_router, prefix="/multi_disease", tags=["multi_disease"])
api_router.include_router(skin_diseases_router, prefix="/skin_diseases", tags=["skin_diseases"])
api_router.include_router(skin2_diseases_router, prefix="/skin2_diseases", tags=["skin2_diseases"])
api_router.include_router(skin3_diseases_router, prefix="/skin3_diseases", tags=["skin3_diseases"])
api_router.include_router(okular_router, prefix="/okular", tags=["okular"])
api_router.include_router(alzheimer_router, prefix="/alzheimer_disease", tags=["alzheimer_disease"])
api_router.include_router(x_ray_router, prefix="/x_ray", tags=["x_ray"])
api_router.include_router(malaria_router, prefix="/malaria", tags=["malaria"])