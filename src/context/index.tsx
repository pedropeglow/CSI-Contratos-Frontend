import React, { createContext, useContext, useState } from 'react';
import { Socio } from '../types/socios';
import {
	createSocioService,
	deleteSocioService,
	getSociosService,
	updateSocioService,
} from '../services/socios';
import { User } from '../types/users';
import { getUserService, updateUserService } from '../services/user';
import { createPessoasJuridicasService, deletePessoasJuridicasService, getPessoasJuridicasService, updatePessoasJuridicasService } from '../services/pessoasJuridicas';
import { PessoaJuridica } from '../types/pessoaJuridica';
import { getCnaeService } from '../services/cnae';
import { Cnae } from '../types/cnae';

export const CSIContext = createContext({} as any);

export function ProviderContext({ children }: any) {
	const [socios, setSocios] = useState<Socio[]>([]);
	const [pessoasJuridicas, setPessoasJuridicas] = useState<PessoaJuridica[]>([]);
	const [cnaes, setCnaes] = useState<Cnae[]>([]);
	const [user, setUser] = useState<User>({ email: '', id: '', token: '' });

	const [snackbarOpen, setSnackbarOpen] = useState<{
		status: boolean;
		type: string;
		message: string;
	}>({
		status: false,
		type: '',
		message: '',
	});

	const getSocios = async () => {
		try {
			const response = await getSociosService(user.id);
			setSocios(response.data);
		} catch (error) {
			throw error;
		}
	};

	const createSocio = async (socioData: any) => {
		try {
			socioData.userId = user.id;
			let response = await getSociosService(user.id);

			response = await createSocioService(socioData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao cadastrar seu socio :)',
			});
			await getSocios();
			return response;

		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos cadastrar seu sócio :(',
			});
			throw error;
		}
	};

	const updateSocio = async (socioData: any) => {
		try {
			const response = await updateSocioService(socioData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao alterar seu sócio :)',
			});
			await getSocios();
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar seu sócio :(',
			});
			throw error;
		}
	};

	const deleteSocio = async (id: any) => {
		try {
			const response = await deleteSocioService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao deletar seu sócio',
			});
			await getSocios();
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos deletar seu sócio :(',
			});
			throw error;
		}
	};

	const getPessoasJuridicas = async () => {
		try {
			const response = await getPessoasJuridicasService(user.id);
			setPessoasJuridicas(response.data);
		} catch (error) {
			throw error;
		}
	};

	const createPessoasJuridicas = async (pessoaJuridicaData: any) => {
		try {
			pessoaJuridicaData.userId = user.id;
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao cadastrar pessoa jurídica :)',
			});
			const response = await createPessoasJuridicasService(pessoaJuridicaData);
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos cadastrar pessoa jurídica :(',
			});
			throw error;
		}
	};

	const updatePessoasJuridicas = async (pessoaJuridicaData: any) => {
		try {
			const response = await updatePessoasJuridicasService(pessoaJuridicaData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao alterar pessoa jurídica :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar pessoa jurídica :(',
			});
			throw error;
		}
	};

	const deletePessoasJuridicas = async (id: any) => {
		try {
			const response = await deletePessoasJuridicasService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao deletar pessoa jurídica',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos deletar pessoa jurídica :(',
			});
			throw error;
		}
	};

	const getCnaes = async () => {
		try {
			const response = await getCnaeService();
			setCnaes(response.data);
		} catch (error) {
			throw error;
		}
	};


	const getUser = async () => {
		try {
			const response = await getUserService(user.id);
			setUser({ ...response.data });
		} catch (error) {
			throw error;
		}
	};

	const updateUser = async (userData: any) => {
		try {
			delete userData.password;
			delete userData.socios;
			const response = await updateUserService(userData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Cadastro alterado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar seu cadastro :(',
			});
			throw error;
		}
	};

	const states = {
		socios,
		pessoasJuridicas,
		cnaes,
		user,
		snackbarOpen
	};

	const actions = {
		getSocios,
		createSocio,
		updateSocio,
		deleteSocio,
		getPessoasJuridicas,
		createPessoasJuridicas,
		updatePessoasJuridicas,
		deletePessoasJuridicas,
		getCnaes,
		setSnackbarOpen,
		setUser,
		getUser,
		updateUser
	};

	return (
		<CSIContext.Provider value={{ ...states, ...actions }}>
			{children}
		</CSIContext.Provider>
	);
}

export const useCSICareContext = () => useContext(CSIContext);
