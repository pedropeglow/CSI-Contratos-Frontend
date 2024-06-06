export interface PessoaJuridica {
	id: string;
	nome: string;
	endereco: string;
	nroImovel: string;
	complemento: string;
	bairro: string;
	cidade: string;
	uf: string;
	cep: string;
	userId: string;
	prazoInicialDeDuracao: Date;
	socioId1: number;
	socioId2: number;
	quotaSocio1: number;
	quotaSocio2: number;
	cnaeId: number;
}
