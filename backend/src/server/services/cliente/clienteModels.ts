import { Model, DataTypes } from 'sequelize';
import Pessoa from '../pessoa/pessoaModels';
import sequelize from '../../config/sequelize';


// Defina o modelo para a tabela 'Cliente'
class Cliente extends Model {
  public id!: number;
  public id_pessoa!: number;
  public data_cadastro!: Date;
  public situacao!: string;
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Pessoa,
        key: 'id',
      },
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    situacao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Ativo',
    },
  },
  {
    sequelize,
    modelName: 'Cliente',
  }
);

// Defina as relações entre os modelos
//Cliente.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });

export default Cliente;
