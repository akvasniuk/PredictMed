import tensorflow as tf

alzheimer_model = tf.keras.models.load_model('alzheimer_img/BrainMRIcnn', compile=False)