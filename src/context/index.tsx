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



export const CSIContext = createContext({} as any);

export function ProviderContext({ children }: any) {
	const [socios, setSocios] = useState<any[]>([]);
	const [pessoasJuridicas, setPessoasJuridicas] = useState<any[]>([]);
	const [user, setUser] = useState<User>({ email: '', id: 5 });

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
			setSocios(response.data.socios);
		} catch (error) {
			throw error;
		}
	};

	const createSocio = async (socioData: any) => {
		try {
			socioData.userId = user.id;
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao cadastrar seu socio :)',
			});
			const response = await createSocioService(socioData);
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

	const updateSocio = async (petData: any) => {
		try {
			const response = await updateSocioService(petData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao alterar seu sócio :)',
			});
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

	const getPessoaJuridicas = async () => {
		try {
			const response = await getSociosService(user.id);
			setSocios(response.data.socios);
		} catch (error) {
			throw error;
		}
	};

	const createPessoaJuridicas = async (socioData: any) => {
		try {
			socioData.userId = user.id;
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao cadastrar seu socio :)',
			});
			const response = await createSocioService(socioData);
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

	const updatePessoaJuridicas = async (petData: any) => {
		try {
			const response = await updateSocioService(petData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao alterar seu sócio :)',
			});
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

	const deletePessoaJuridicas = async (id: any) => {
		try {
			const response = await deleteSocioService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao deletar seu sócio',
			});
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
		user,
		pessoasJuridicas
	};

	const actions = {
		getSocios,
		createSocio,
		setUser,
		updateSocio,
		deleteSocio,
		getUser,
		updateUser,
		setSnackbarOpen,
		getPessoaJuridicas,
		createPessoaJuridicas,
		updatePessoaJuridicas,
		deletePessoaJuridicas
	};

	return (
		<CSIContext.Provider value={{ ...states, ...actions }}>
			{children}
		</CSIContext.Provider>
	);
}

export const useCSICareContext = () => useContext(CSIContext);
