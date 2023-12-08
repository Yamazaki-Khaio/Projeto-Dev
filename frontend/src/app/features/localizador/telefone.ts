export interface Telefone {
  id?: number; // O ID é opcional, pois será atribuído pelo backend
  telefone: string;
  cliente_id: number;
}
