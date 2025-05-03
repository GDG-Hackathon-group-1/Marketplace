# utils/image_upload_service.py
import os
from uuid import uuid4
from PIL import Image
from django.conf import settings
from django.core.files.storage import default_storage

class ImageUploadService:
    @staticmethod
    def compress_and_save(image_file, folder="uploads", quality=70):
        ext = image_file.name.split('.')[-1].lower()
        filename = f"{uuid4()}.{ext}"
        path = os.path.join(folder, filename)
        full_path = os.path.join(settings.MEDIA_ROOT, path)

        # Ensure folder exists
        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        # Save compressed image
        image = Image.open(image_file)
        image.convert('RGB').save(full_path, optimize=True, quality=quality)

        return default_storage.url(path)  # returns MEDIA_URL + path
