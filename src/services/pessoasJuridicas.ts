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

export const getPessoaJuridicaPdfService = async (pjId: string) => {
    return await api.post(
        `/api/contratoSocials/${pjId}`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Substitua pelo token de autenticação real
            },
            responseType: 'blob', // Certifica-se de que a resposta seja um blob
        }
    );
};

export const getContratoValidadoService = async (contratoId: string) => {
	return await api.get(`api/contratoSocials/${contratoId}`);
};