import React, { useEffect, useState } from 'react';
import { useCSICareContext } from '../../context';


import { Socio } from '../../types/socios';

interface DashboardProps {
	handleOpenCreateForm: () => void;
	handleOpenEditForm: (socio: Socio) => void;
	handleOpenDeleteConfirmation: (socio: Socio) => void;
}

export const Dashboard = ({
	handleOpenCreateForm,
	handleOpenEditForm,
	handleOpenDeleteConfirmation,
}: DashboardProps) => {
	const { socios, getSocios, snackbarOpen } = useCSICareContext();

	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getSocios();
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const dateFormat = (date: any) => {
		const deleteTimestamp = date?.split('T')[0];
		const day = deleteTimestamp.split('-')[2];
		const month = deleteTimestamp.split('-')[1];
		const year = deleteTimestamp.split('-')[0];

		return `${day}/${month}/${year}`;
	};

	return (
		<h1>Socios</h1>
	);
};
