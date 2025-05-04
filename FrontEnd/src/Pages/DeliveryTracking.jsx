import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function DeliveryTracking() {
	const defaultCenter = { lat: 9.03, lng: 38.74 }
	const [userLocation, setUserLocation] = useState(null)

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					setUserLocation({ lat: latitude, lng: longitude })
				},
				(error) => {
					console.error('Error fetching user location:', error)
				},
				{ enableHighAccuracy: true }
			)
		}
	}, [])

	return (
		<div className="flex flex-col min-h-screen">
			<header className="flex justify-between items-center px-6 py-4 bg-white shadow">
				<h1 className="text-xl font-semibold">Delivery Tracker</h1>
			</header>

			<div className="h-72">
				<MapContainer
					center={userLocation || defaultCenter}
					zoom={15}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={userLocation || defaultCenter} />
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
