export interface Cliente {
  id?: number; // O ID é opcional, pois será atribuído pelo backend
  nome: string;
  identificacao: string;
  nome_mae?: string;
  nome_fantasia?: string;
  inscricao_municipal?: string;
  inscricao_estadual?: string;
  situacao?: string;
  data_cadastro?: Date;

}

