import { api } from './api';

export const createPessoasJuridicasService = async (pessoasJuridicasData: any) => {
	return await api.post('api/pessoasjuridicas/', { ...pessoasJuridicasData });
};

export const updatePessoasJuridicasService = async (pessoasJuridicas: any) => {
	return await api.put(`api/pessoasjuridicas/${pessoasJuridicas.id}`, { ...pessoasJuridicas });
};

export const deletePessoasJuridicasService = async (id: any) => {
	return await api.delete(`api/pessoasjuridicas/${id}`);
};

export const getPessoasJuridicasService = async (userId: string) => {
	return await api.get(`api/pessoasjuridicas/todaspjs/${userId}`);
};
