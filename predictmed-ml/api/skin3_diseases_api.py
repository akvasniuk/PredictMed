from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np

from models.skin3_diseases_model import skin_disease_model

classes = ['Eczema', 'Melanoma','Atopic Dermatitis','Basal Cell Carcinoma (BCC)',
           'Melanocytic Nevi (NV)', 'enign Keratosis-like Lesions (BKL)',
           'Psoriasis pictures Lichen Planus and related diseases', 
           'Seborrheic Keratoses and other Benign Tumors',
           'Tinea Ringworm Candidiasis and other Fungal Infections',
           'Warts Molluscum and other Viral Infections']

skin3_diseases_router = APIRouter()

def classify_image(image_path):
    image = Image.open(image_path)
    img = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = skin_disease_model.predict(img_array)
    print(np.argmax(predictions))
    class_label = classes[np.argmax(predictions)]

    return class_label


@skin3_diseases_router.post("/predict")
async def predict_skin3_diseases(file: UploadFile=File(...)):
    try:
        with open("temp.jpg", "wb") as f:
          f.write(file.file.read())

        class_label = classify_image("temp.jpg")

        import os

        os.remove("temp.jpg")

        return {"prediction": class_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))