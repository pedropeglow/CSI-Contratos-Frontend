import React, { useEffect, useState } from 'react'
import { useCSICareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Button, Container, Box, IconButton, Stack, CircularProgress } from '@mui/material'
import { Socio } from '../../types/socios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StartHere } from '../../components/startHere';
import { formatCPF } from '../../utils/cpfFormat';
import { formatRg } from '../../utils/rgFormat';
import { formatCEP } from '../../utils/cepForm';
import SnackbarComponent from '../../components/snackbar/Snackbar';


const estadosCivis = [
	{ id: 1, label: 'Solteiro' },
	{ id: 2, label: 'Casado' },
	{ id: 3, label: 'Viúvo' },
	{ id: 4, label: 'Divorciado' }
];

const getEstadoCivilLabel = (id: number) => {
	const estadoCivil = estadosCivis.find(estado => estado.id === id);
	return estadoCivil ? estadoCivil.label : 'Desconhecido';
};

interface DashboardProps {
	handleOpenCreateForm: () => void
	handleOpenEditForm: (socio: Socio) => void
	handleOpenDeleteConfirmation: (socio: Socio) => void
}

export const Dashboard = ({ handleOpenCreateForm, handleOpenEditForm, handleOpenDeleteConfirmation }: DashboardProps) => {
	const { socios, getSocios, snackbarOpen } = useCSICareContext()
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getSocios();
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
					padding: '40px 0px',
				}}
			>	
			<IconButton onClick={handleOpenCreateForm}>
					<AddIcon sx={{ fontSize: '30px' }} />
			</IconButton>
				
			</Box>
			<Container
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				{!!socios.length && !loading ? (
					socios.map((socio: Socio) => {
						return (
							<Card
								variant='outlined'
								key={socio?.id}
								sx={{
									height: '300px',
									width: '420px',
									marginBottom: '20px',
									padding: '10px',
								}}
							>
								<CardContent sx={{ padding: '10px' }}>
									<Stack
										direction='row'
										justifyContent='space-between'
										alignItems='center'
									>
										<Typography
											sx={{ fontSize: 16, fontWeight: 600 }}
											color='text.primary'
											variant='h3'
											gutterBottom
										>
											{socio?.nome}
										</Typography>
									</Stack>
									<Stack
										direction='column'
										justifyContent='flex-end'
										alignItems='flex-start'
										height='180px'
									>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`CPF: ${formatCPF(socio?.cpf)}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`RG: ${formatRg(socio?.rg)}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Nacionalidade: ${socio?.nacionalidade}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Estado Civil: ${getEstadoCivilLabel(socio?.estadoCivil)}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Profissão: ${socio?.profissao}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Endereço: ${socio?.endereco},` + ` ${socio?.nroImovel},` + ` ${socio?.bairro},` + ` ${socio?.cidade},` + ` ${socio?.uf}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Complemento: ${socio?.complemento}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`CEP: ${formatCEP(socio?.cep)}`}
										</Typography>
									</Stack>
								</CardContent>
								<CardActions
									sx={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-evenly',
										padding: '0px',
									}}
								>
									<IconButton onClick={() => handleOpenDeleteConfirmation(socio)}>
										<DeleteIcon sx={{ fontSize: '25px' }} />
									</IconButton>
									<IconButton onClick={() => handleOpenEditForm(socio)}>
										<EditIcon sx={{ fontSize: '25px' }} />
									</IconButton>
								</CardActions>
							</Card>
						);
					})
				) : !socios.length && !loading ? (
					<StartHere title={'Comece adicionando seu socio!'} />
				) : (
					<CircularProgress color='secondary' />
				)}
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);

};
