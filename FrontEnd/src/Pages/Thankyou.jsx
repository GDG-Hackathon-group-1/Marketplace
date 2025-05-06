import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ThankYouPage() {
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/') // Redirect to home after 5 seconds
		}, 5000)

		return () => clearTimeout(timer)
	}, [navigate])

	return (
		<div>
			<br />
			<br />
			<br />
			<h1>Payment Successful! 🎉</h1>
			<br />
			<br />
			<br />
			<h2>You will be redirected to the homepage shortly.</h2>
			<div
				className="mt-6 w-fit bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				id=""
			>
				<Link to="delivery-tracking">Delivery Tracking</Link>
			</div>
		</div>
	)
}

export default ThankYouPage
