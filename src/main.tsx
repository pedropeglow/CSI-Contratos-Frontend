import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { ProviderContext } from './context';
import { Signup } from './pages/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
	{
		path: '/profile',
		element: <App />,
	},
	{
		path: '/socios/dashboard',
		element: <App />,
	},
	{
		path: '/socios/create',
		element: <App />,
	},
	{
		path: '/socios/edit',
		element: <App />,
	},
	{
		path: '/usuario/edit',
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ProviderContext>
			<RouterProvider router={router} />
		</ProviderContext>
	</React.StrictMode>
);
