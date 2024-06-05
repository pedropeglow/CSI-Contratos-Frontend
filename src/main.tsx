import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { ProviderContext } from './context';
import { Signup } from './pages/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import PrivateRoute from './pages/priviateRoutes/PrivateRoute';

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
		path: '/socios',
		element: <PrivateRoute />,
		children: [
			{ path: '', element: <App /> },
			{ path: 'dashboard', element: <App /> },
			{ path: 'create', element: <App /> },
			{ path: 'edit', element: <App /> },
		],
	},
	{
		path: '/pessoaJuridica',
		element: <PrivateRoute />,
		children: [
			{ path: '', element: <App /> },
			{ path: 'dashboard', element: <App /> },
			{ path: 'create', element: <App /> },
			{ path: 'edit', element: <App /> },
		],
	},
	{
		path: '/usuario/edit',
		element: <PrivateRoute />,
		children: [
			{ path: '', element: <App /> },
		],
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ProviderContext>
			<RouterProvider router={router} />
		</ProviderContext>
	</React.StrictMode>
);