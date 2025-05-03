# utils/chapa_service.py
import requests
from django.conf import settings

class ChapaService:
    BASE_URL = "https://api.chapa.co/v1"

    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}",
            "Content-Type": "application/json"
        }

    def initialize_payment(self, data):
        url = f"{self.BASE_URL}/transaction/initialize"
        response = requests.post(url, json=data, headers=self.headers)
        return response.json()

    def verify_payment(self, tx_ref):
        url = f"{self.BASE_URL}/transaction/verify/{tx_ref}"
        response = requests.get(url, headers=self.headers)
        return response.json()
