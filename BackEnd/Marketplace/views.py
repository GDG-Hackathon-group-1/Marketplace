# views.py
from utils.image_upload_service import ImageUploadService
from utils.chapa_service import ChapaService
from utils.ml_model_handler import MLModelHandler

url = ImageUploadService.compress_and_save(request.FILES['image'])

chapa = ChapaService()
payment = chapa.initialize_payment({
    "amount": "100",
    "currency": "ETB",
    "email": "user@example.com",
    "tx_ref": "123456",
    "callback_url": "https://yourapp.com/callback",
    "return_url": "https://yourapp.com/success"
})

ml = MLModelHandler()
similar = ml.find_similar(uploaded_image_path, product_image_paths)
