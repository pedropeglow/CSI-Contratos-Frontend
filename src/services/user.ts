import { api } from './api';

export const updateUserService = async (userData: any) => {
	return await api.patch(`/usarios/${userData.id}`, { ...userData });
};

export const getUserService = async (userId: string) => {
	return await api.get(`/usarios/${userId}`);
};
