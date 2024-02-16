from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.malaria_model import malaria_model

malaria_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((128, 128))

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = malaria_model.predict(img_array)
    class_label = np.argmax(predictions)

    return class_label


@malaria_router.post("/predict")
async def predict_malaria(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        prediction = "Malaria" if class_label == 1 else "Not malaria"

        return {"prediction": prediction}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))