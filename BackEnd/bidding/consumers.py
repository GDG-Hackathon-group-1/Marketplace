import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BidConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.product_id = self.scope['url_route']['kwargs']['product_id']
        self.room_group_name = f'bid_{self.product_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'new_bid',
                'message': data['message']
            }
        )

    async def new_bid(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))
