import React, {useEffect, useState} from 'react'
import { useCSICareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Container, Box, IconButton, Stack, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StartHere } from '../../components/startHere';
import { formatCPF } from '../../utils/cpfFormat';
import { formatRg } from '../../utils/rgFormat';
import { formatCEP } from '../../utils/cepForm';
import SnackbarComponent from '../../components/snackbar/Snackbar';
import { PessoaJuridica } from '../../types/pessoaJuridica';


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
  handleOpenEditForm: (pessoaJuridica: PessoaJuridica) => void
  handleOpenDeleteConfirmation: (pessoaJuridica: PessoaJuridica) => void
}

export const Dashboard = ({handleOpenCreateForm, handleOpenEditForm, handleOpenDeleteConfirmation}: DashboardProps) => {
  const {pessoasJuridicas, getPessoasJuridicas, snackbarOpen } = useCSICareContext()
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
		setLoading(true);
		await getPessoasJuridicas();
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
				{!!pessoasJuridicas.length && !loading ? (
					pessoasJuridicas.map((pessoaJuridica: PessoaJuridica) => {
						return (
							<Card
								variant='outlined'
								key={pessoaJuridica?.id}
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
											{pessoaJuridica?.nome}
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
									<IconButton onClick={() => handleOpenDeleteConfirmation(pessoaJuridica)}>
										<DeleteIcon sx={{ fontSize: '25px' }} />
									</IconButton>
									<IconButton onClick={() => handleOpenEditForm(pessoaJuridica)}>
										<EditIcon sx={{ fontSize: '25px' }} />
									</IconButton>
								</CardActions>
							</Card>
						);
					})
				) : !pessoasJuridicas.length && !loading ? (
					<StartHere title={'Adicione informações da sua PJ para gerar o Contrato!'} />
				) : (
					<CircularProgress color='secondary' />
				)}
			</Container>
      {!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
  
};
