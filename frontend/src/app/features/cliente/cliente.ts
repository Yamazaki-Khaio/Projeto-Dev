export interface Cliente {
  nome_mae?: string;
  nome_fantasia?: string;
  id?: number; // O ID é opcional, pois será atribuído pelo backend
  nome: string;
  identificacao: string;
  nome_ref: string;
  inscricao_municipal?: string;
  inscricao_estadual?: string;
  situacao?: string;
  data_cadastro?: Date;

}

