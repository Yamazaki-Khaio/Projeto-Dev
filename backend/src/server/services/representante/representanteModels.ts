import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

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
      autoIncrement: true,
      
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    modelName: 'Representante',
    sequelize,

  }
);



export default Representante;
