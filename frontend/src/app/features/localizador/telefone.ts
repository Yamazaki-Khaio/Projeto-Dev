export interface Telefone {
  id?: number; // O ID é opcional, pois será atribuído pelo backend
  tel: string;
  is_principal: boolean;
}
