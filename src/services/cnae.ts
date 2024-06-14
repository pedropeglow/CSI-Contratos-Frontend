import { api } from './api';

export const getCnaeService = async () => {
	return await api.get(`api/Cnaes`);
};
