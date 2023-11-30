export interface Cliente {
  id: number;
  nome: string;
  idenficado: number;
  nome_mae: string | null;
  nome_fantasia: string | null;
  situacao: string;
  data_cadastro: Date;

}
