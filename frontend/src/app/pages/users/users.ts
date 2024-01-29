export interface Users {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    senha_atual?: string;
    createdAt?: Date;
    updatedAt?: Date;

}
