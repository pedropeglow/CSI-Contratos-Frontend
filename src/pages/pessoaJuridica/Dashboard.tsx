import React, { useEffect, useState } from 'react'
import { useCSICareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Container, Box, IconButton, Stack, CircularProgress, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StartHere } from '../../components/startHere';
import { formatCEP } from '../../utils/cepForm';
import SnackbarComponent from '../../components/snackbar/Snackbar';
import { PessoaJuridica } from '../../types/pessoaJuridica';
import { dateFormat } from '../../utils/dateFormat';

interface DashboardProps {
	handleOpenCreateForm: () => void
	handleOpenEditForm: (pessoaJuridica: PessoaJuridica) => void
	handleOpenDeleteConfirmation: (pessoaJuridica: PessoaJuridica) => void
	handlePdf: (pessoaJuridica: PessoaJuridica) => void;
}

export const Dashboard = ({ handleOpenCreateForm, handleOpenEditForm, handleOpenDeleteConfirmation, handlePdf }: DashboardProps) => {
	const { pessoasJuridicas, getPessoasJuridicas, snackbarOpen, socios, getSocios, cnaes } = useCSICareContext()
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getPessoasJuridicas();
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const getSocioLabel = (id: number) => {
		const socio = socios.find((socio: { id: number }) => socio.id === id);
		return socio ? socio.nome : 'Desconhecido';
	};

	const getCnaeLabel = (id: number) => {
		const cnae = cnaes.find((cnae: { id: number }) => cnae.id === id);
		return cnae ? cnae.descCnae : 'Desconhecido';
	};

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
			{pessoasJuridicas.length < 1 ? <IconButton onClick={handleOpenCreateForm}>
					<AddIcon sx={{ fontSize: '30px' }} />
			</IconButton> : <></>}
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
									height: '370',
									width: '450px',
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
									<Stack
										direction='column'
										justifyContent='flex-end'
										alignItems='flex-start'
									>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Endereço: ${pessoaJuridica?.endereco},` + ` ${pessoaJuridica?.nroImovel},` + ` ${pessoaJuridica?.bairro},` + ` ${pessoaJuridica?.cidade},` + ` ${pessoaJuridica?.uf}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Complemento: ${pessoaJuridica?.complemento}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`CEP: ${formatCEP(pessoaJuridica?.cep)}`}
										</Typography>
									</Stack>
									<Stack>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`1º Sócio: ${getSocioLabel(pessoaJuridica.socio1Id)}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`2º Sócio: ${getSocioLabel(pessoaJuridica.socio2Id)}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`1º Quota: R$ ${pessoaJuridica?.quotaSocio1}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`2º Quota: R$ ${pessoaJuridica?.quotaSocio2}`}
										</Typography>

										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Prazo inicial de duração: ${dateFormat(pessoaJuridica?.prazoInicialDeDuracao)}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`CNAE: ${getCnaeLabel(pessoaJuridica.cnaeId)}`}
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
								<CardActions sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									padding: '10px',
								}}>
									<Button onClick={() => handlePdf(pessoaJuridica)} variant="contained" color="success">
										Gerar Contrato Social
									</Button>
								</CardActions>
								<Typography sx={{ fontSize: 14, padding: '10px', textAlign: 'justify' }}>
									Após elaborar o contrato, clique em <a href="https://terceiroregistropoa.com.br/sociedadeltda.html">Inscrição de Sociedade Simples LTDA</a>. 
									Em seguida, siga os passos abaixo:
									<ol>
										<li>Assista ao <a href="https://terceiroregistropoa.com.br/sociedadeltda.html">primeiro vídeo</a> do site para aprender a fazer a pesquisa de viabilidade.</li>
										<li>Preencha o Documento Básico de Entrada (DBE) conforme explicado no <a href="https://terceiroregistropoa.com.br/sociedadeltda.html">segundo vídeo</a> do site.</li>
										<li>Leve o contrato assinado ao cartório com o protocolo do DBE ou apresente todos os documentos com assinatura eletrônica no portal <a href="https://www.rtdbrasil.org.br/">RTD Brasil</a>.</li>
									</ol>
								</Typography>
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
