import { api } from './api';

export const createSocioService = async (socioData: any) => {
	return await api.post('/socios/', { ...socioData });
};

export const updateSocioService = async (socioData: any) => {
	return await api.patch(`/socios/${socioData.id}`, { ...socioData });
};

export const deleteSocioService = async (id: any) => {
	return await api.delete(`/socios/${id}`);
};

export const getSociosService = async (userId: number) => {
	return await api.get(`/users/${userId}`);
};
