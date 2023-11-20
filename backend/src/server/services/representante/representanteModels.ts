import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';
import Cliente from '../cliente/clienteModels';
import Pessoa from '../pessoa/pessoaModels';

// Defina o modelo para a tabela 'Representante'
class Representante extends Model {
  public id!: number;
  public id_pessoa!: number;
  public id_cliente!: number;
}

Representante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Representante',
  }
);



export default Representante;
