import { useEffect, useState } from 'react'
import {
	MapContainer,
	TileLayer,
	Marker,
	Polyline,
	useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
	iconRetinaUrl: '/images/marker-icon-2x.png',
	iconUrl: '/images/marker-icon.png',
	shadowUrl: '/images/marker-shadow.png',
})

function MapAutoCenter({ position }) {
	const map = useMap()
	useEffect(() => {
		if (position) {
			map.setView(position, 18)
		}
	}, [position, map])
	return null
}

// Move location
const moveLocation = (lat, lng, metersNorth = 0, metersEast = 0) => {
	const earthRadius = 6378137
	const newLat = lat + (metersNorth / earthRadius) * (180 / Math.PI)
	const newLng =
		lng +
		(metersEast / (earthRadius * Math.cos((Math.PI * lat) / 180))) *
			(180 / Math.PI)
	return { lat: newLat, lng: newLng }
}

// Haversine formula to calculate distance (in km)
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
	const [showDetails, setShowDetails] = useState(false)

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					const userLoc = { lat: latitude, lng: longitude }
					setReceiverLocation(userLoc)

					const deliveryLoc = moveLocation(
						latitude,
						longitude,
						-10,
						-8
					)
					setDeliveryGuyLocation(deliveryLoc)
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
		<div className="flex flex-col min-h-screen bg-gray-100">
			<header className="flex justify-between items-center px-6 py-4 bg-white shadow">
				<h1 className="text-xl font-semibold">Delivery Tracker</h1>
				<button
					className="bg-gray-200 px-4 py-2 rounded"
					onClick={() => setShowDetails(true)}
				>
					Details
				</button>
			</header>

			<div className="w-full h-72 z-0">
				<MapContainer
					center={receiverLocation || defaultCenter}
					zoom={18}
					style={{ height: '100%', width: '100%', zIndex: -10 }}
				>
					<TileLayer
						attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{deliveryGuyLocation && (
						<>
							<MapAutoCenter
								position={[
									deliveryGuyLocation.lat,
									deliveryGuyLocation.lng,
								]}
							/>
							<Marker
								position={[
									deliveryGuyLocation.lat,
									deliveryGuyLocation.lng,
								]}
							/>
						</>
					)}
					{receiverLocation && (
						<Marker
							position={[
								receiverLocation.lat,
								receiverLocation.lng,
							]}
						/>
					)}
				</MapContainer>
			</div>

			<div className="p-4">
				<div className="bg-white shadow rounded p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="font-semibold text-lg">Your Delivery</h2>
						<span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
							Arriving soon
						</span>
					</div>

					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<p className="text-gray-500">ETA</p>
							<p className="font-medium">Less than a minute</p>
						</div>
						<div>
							<p className="text-gray-500">Distance</p>
							<p className="font-medium">
								{distance ? `${distance} km` : 'Calculating...'}
							</p>
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
			{showDetails && (
				<div
					className="fixed inset-0 bg-black/80 bg-opacity-50 z-40"
					onClick={() => setShowDetails(false)}
				>
					<div
						className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold">
								Order{' '}
								<span className="text-gray-500">#ORD-7829</span>
							</h2>
							<button
								onClick={() => setShowDetails(false)}
								className="text-gray-500 text-xl"
							>
								&times;
							</button>
						</div>

						<p className="text-sm text-gray-500 mb-1">
							Placed today at 12:30 PM
						</p>

						<div className="mb-4">
							<p className="text-sm font-medium text-gray-700">
								Items
							</p>
							<div className="border rounded p-2 mt-1">
								Lunch Box Special
							</div>
						</div>

						<div className="mb-4">
							<p className="text-sm font-medium text-gray-700">
								Delivery Person
							</p>
							<div className="flex items-center gap-3 mt-2">
								<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
									M
								</div>
								<div>
									<p className="font-medium">Michael</p>
									<p className="text-sm text-gray-500">
										+1 (555) 123-4567
									</p>
								</div>
							</div>
						</div>

						<button className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800/5">
							Contact Delivery Person
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
