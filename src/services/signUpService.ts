import { api } from './api';

export const signup = async (data: any) => {
	const { email, password, confirmPassword } = data;

	return await api.post('csi/conta/registrar', { email: email, senha: password, confirmaSenha: confirmPassword });
};
