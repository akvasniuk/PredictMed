from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.alzheimer_img_model import alzheimer_model

classes = ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented']

alzheimer_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((128, 128))
    if img.mode != "RGB":
        img = img.convert("RGB")

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = alzheimer_model.predict(img_array)
    class_label = classes[np.argmax(predictions)]

    return class_label


@alzheimer_router.post("/predict")
async def predict_alzheimer(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        return {"prediction": class_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))