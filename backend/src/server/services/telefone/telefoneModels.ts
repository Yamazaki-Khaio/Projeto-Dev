import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';


// Defina o modelo para a tabela 'Telefone'
class Telefone extends Model {
    public id!: number;
    public tel!: string;
    public is_principal!: boolean;
    public id_pessoa!: number;
}

Telefone.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        is_principal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,

        },
        id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
    },
    {
        sequelize,
        modelName: 'Telefone',
    }
);


export default Telefone;