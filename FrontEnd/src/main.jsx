import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import routes from './Components/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import './CSS/index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={routes} />
	</StrictMode>
)
