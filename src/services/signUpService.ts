import { api } from './api';

export const signup = async (data: any) => {
	const { email, password, fullname } = data;

	return await api.post('/usarios', { email, password, fullname });
};
