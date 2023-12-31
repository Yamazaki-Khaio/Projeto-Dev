import { Model, DataTypes } from 'sequelize';
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
    modelName: 'Cliente',
    sequelize,
    
  }
);


export default Cliente;

sequelize;
