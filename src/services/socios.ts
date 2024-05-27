import { api } from './api';

export const createSocioService = async (socioData: any) => {
	return await api.post('api/Socios/', { ...socioData });
};

export const updateSocioService = async (socioData: any) => {
	return await api.put(`api/Socios/${socioData.id}`, { ...socioData });
};

export const deleteSocioService = async (id: any) => {
	return await api.delete(`api/Socios/${id}`);
};

export const getSociosService = async (userId: string) => {
	return await api.get(`api/Socios/${userId}`);
};
