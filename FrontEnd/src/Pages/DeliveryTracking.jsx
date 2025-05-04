import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const calculateDistance = (loc1, loc2) => {
	const toRad = (value) => (value * Math.PI) / 180
	const R = 6371
	const dLat = toRad(loc2.lat - loc1.lat)
	const dLng = toRad(loc2.lng - loc1.lng)
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(loc1.lat)) *
			Math.cos(toRad(loc2.lat)) *
			Math.sin(dLng / 2) ** 2
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return R * c
}

export default function DeliveryTracking() {
	const [receiverLocation, setReceiverLocation] = useState(null)
	const [deliveryGuyLocation, setDeliveryGuyLocation] = useState(null)
	const [route, setRoute] = useState([])
	const [distance, setDistance] = useState(null)

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					const userLoc = { lat: latitude, lng: longitude }
					setReceiverLocation(userLoc)
				},
				(error) => {
					console.error('Geolocation error:', error)
					alert('Unable to get your location.')
				},
				{ enableHighAccuracy: true }
			)
		} else {
			alert('Geolocation not supported.')
		}
	}, [])

	useEffect(() => {
		const fetchRoute = async () => {
			if (!receiverLocation || !deliveryGuyLocation) return

			const apiKey = import.meta.env.VITE_MAP_API_KEY

			const url =
				'https://api.openrouteservice.org/v2/directions/foot-walking/geojson'
			const body = {
				coordinates: [
					[deliveryGuyLocation.lng, deliveryGuyLocation.lat],
					[receiverLocation.lng, receiverLocation.lat],
				],
			}

			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: apiKey,
					},
					body: JSON.stringify(body),
				})
				const data = await response.json()
				const routeCoords = data.features[0].geometry.coordinates.map(
					([lng, lat]) => [lat, lng]
				)
				setRoute(routeCoords)

				const km = calculateDistance(
					receiverLocation,
					deliveryGuyLocation
				)
				setDistance(km.toFixed(2))
			} catch (error) {
				console.error('Route fetch failed:', error)
			}
		}
		fetchRoute()
	}, [receiverLocation, deliveryGuyLocation])

	const defaultCenter = { lat: 9.03, lng: 38.74 }

	return (
		<div className="flex flex-col min-h-screen">
			<header className="flex justify-between items-center px-6 py-4 bg-white shadow">
				<h1 className="text-xl font-semibold">Delivery Tracker</h1>
			</header>

			<div className="h-72">
				<MapContainer
					center={receiverLocation || defaultCenter}
					zoom={15}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
			</div>

			<div className="p-4">
				<div className="bg-white shadow rounded p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="font-semibold text-lg">Your Delivery</h2>
						<span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
							In Progress
						</span>
					</div>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<p className="text-gray-500">ETA</p>
							<p className="font-medium">Less than a minute</p>
						</div>
						<div>
							<p className="text-gray-500">Delivery Location</p>
							<p className="font-medium">Your Location</p>
						</div>
						<div>
							<p className="text-gray-500">Order</p>
							<p className="font-medium">Lunch Box Special</p>
						</div>
					</div>

					<button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
						Contact Driver
					</button>
				</div>
			</div>
		</div>
	)
}
