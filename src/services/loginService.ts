import { api } from './api';

export const login = async (data: any) => {
	const { email, password } = data;
	
	return await api.post('csi/conta/login', { email: email, senha: password });
};
