import React, { useEffect, useState } from 'react';
import { useCSICareContext } from '../../context';

import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';

export const MySocios = () => {
	const navigate = useNavigate();
	const { getPets, deletePet, getPetPdf } = useCSICareContext();

	const [isFormOpen, setOpenForm] = useState(false);
	const [isCreate, setCreate] = useState(false);
	const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);

	return (
		<h1>Meus socios</h1>
	);
};
