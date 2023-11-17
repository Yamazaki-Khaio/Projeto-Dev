import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import Pessoa from '../pessoa/pessoaModels';


// modelo para a tabela 'Email'
class Email extends Model {
  public id!: number;
  public email!: string;
  public is_principal!: boolean;
  public id_pessoa!: number;
}

Email.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    email: {
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
    modelName: 'Email',
  }
);

//Email.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });

export default Email;