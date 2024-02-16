from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.disease_model import diseases_model

classes = ['Acne', 'Actinic Keratosis', 
           'Chromhidrosis', 'Eruptive Xanthomas', 'Erythrasma', 
           'Impetigo', 'Keratosis Pilaris', 'Leprosy', 'Lupus', 'Lyme Disease', 
           'Measles', 'Melanoma', 'Melasma', 'Otophyma', 'RingWorm', 'Scabies2', 
           'Shingles', 'Solar Lentigo', 'dermatofibroma', 'eczema', 'hives', 'psoriasis', 
           'rosacea', 'scabies']

disease_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = diseases_model.predict(img_array)
    class_label = classes[np.argmax(predictions)]

    return class_label


@disease_router.post("/predict")
async def predict_disease(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        return {"prediction": class_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))