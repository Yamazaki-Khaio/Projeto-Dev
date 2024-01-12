export interface Email {
  id?: number; // O ID é opcional, pois será atribuído pelo backend
  email: string;
  // cliente_id: number;
  is_principal: boolean;
}
