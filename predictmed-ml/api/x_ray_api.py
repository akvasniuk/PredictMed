from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.x_ray_model import x_ray_model

classes = ["pneumonia",
    "pneumosclerosis",
    "atherosclerosis_of_the_aorta",
    "post_inflammatory_changes",
    "hydrothorax",
    "cardiomegaly",
    "tuberculosis",
    "ards",
    "hydropneumothorax",
    "venous_congestion",
    "emphysema",
    "abscess",
    "post_traumatic_ribs_deformation",
    "sarcoidosis",
    "scoliosis",
    "atelectasis",
    "fracture"]

x_ray_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((64, 64))

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = x_ray_model.predict(img_array)
    class_label = classes[np.argmax(predictions)]

    return class_label


@x_ray_router.post("/predict")
async def predict_x_ray(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        return {"prediction": class_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))