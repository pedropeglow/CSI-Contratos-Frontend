import React, { useEffect, useState } from 'react';
import { useCSICareContext } from '../../context';

import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Container,
	Box,
	IconButton,
	Avatar,
	Stack,
	CircularProgress,
} from '@mui/material';
import { Socio } from '../../types/socios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Paw from './../../assets/paw.png';
import Dog from './../../assets/dog.png';
import Cat from './../../assets/cat.png';
import { StartHere } from '../../components/startHere';
import SnackbarComponent from '../../components/snackbar/Snackbar';

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
