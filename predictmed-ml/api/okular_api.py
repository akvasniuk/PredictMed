from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.okular_model import okular_model

classes = ['Normal', 'Cataract','Diabetes','Glaucoma','Hypertension', 'Myopia', 'Age Issues', 'Other']

okular_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = okular_model.predict(img_array)
    class_label = classes[np.argmax(predictions)]

    return class_label


@okular_router.post("/predict")
async def predict_okular(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        return {"prediction": class_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))