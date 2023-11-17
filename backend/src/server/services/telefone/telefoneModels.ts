import { Model, DataTypes } from 'sequelize';
import Pessoa from '../pessoa/pessoaModels';
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
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_principal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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

//Telefone.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });

export default Telefone;