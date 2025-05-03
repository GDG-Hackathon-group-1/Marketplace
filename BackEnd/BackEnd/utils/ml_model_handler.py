# utils/ml_model_handler.py
import os
import numpy as np
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.applications.mobilenet import MobileNet, preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model

class MLModelHandler:
    def __init__(self):
        base_model = MobileNet(weights='imagenet', include_top=False, pooling='avg')
        self.model = Model(inputs=base_model.input, outputs=base_model.output)

    def extract_features(self, image_path):
        img = image.load_img(image_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        features = self.model.predict(x)
        return features.flatten()

    def find_similar(self, uploaded_image_path, image_db_paths, top_k=5):
        uploaded_vector = self.extract_features(uploaded_image_path)
        db_vectors = [self.extract_features(path) for path in image_db_paths]

        similarities = cosine_similarity([uploaded_vector], db_vectors)[0]
        top_indices = np.argsort(similarities)[::-1][:top_k]

        similar_images = [(image_db_paths[i], similarities[i]) for i in top_indices]
        return similar_images
