import axios from 'axios';

export const fetchCepData = async (cep: string) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            console.error("CEP não encontrado");
            return null;
        } else {
            const { logradouro, bairro, localidade, uf, cep } = response.data;
            return {
                endereco: logradouro,
                bairro: bairro,
                cidade: localidade,
                uf: uf,
                cep: cep,
            };
        }
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        return null;
    }
};