export interface Endereco {
  id?: number; // O ID é opcional, pois será atribuído pelo backend
  cep: string;
  logradouro: string;
  numero?: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  id_pessoa: string;
  is_principal: boolean;

}
