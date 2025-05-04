import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function App() {
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
		</div>
	)
}
