from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.multi_disease_model import multi_disease_model

classes = ['Brain - Alzheimer MildDemented',
"Brain - Alzheimer ModerateDemented",
"Brain - Alzheimer NonDemented",
"Brain - Alzheimer VeryMildDemented",
"Brain - No  Brain Tumor",
"Brain - glioma Brain Tumor",
"Brain - meningioma Brain Tumor",
"Brain - pituitary Brain Tumor",
"Chest - Covid19",
"Chest - Lung Opacity",
"Chest - Normal",
"Chest - Pneumonia",
"RF - AMD",
"RF - Cataract",
"RF - Glaucoma",
"RF - Hypertensive Retinopathy",
"RF - Mild DR",
"RF - Moderate DR",
"RF - Normal Fundus",
"RF - Proliferate DR",
"RF - Severe DR",
"Skin - akiec",
"Skin - bcc",
"Skin - bkl",
"Skin - df",
"Skin - mel",
"Skin - nv",
"Skin - vasc"
]

multi_disease_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = multi_disease_model.predict(img_array)
    class_label = classes[np.argmax(predictions)]

    return class_label


@multi_disease_router.post("/predict")
async def predict_multi_disease(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        return {"prediction": class_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))