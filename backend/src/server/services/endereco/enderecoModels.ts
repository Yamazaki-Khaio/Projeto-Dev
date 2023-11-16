import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

class Endereco extends Model {
  public cep!: string;
  public logradouro!: string;
  public numero!: string | null;
  public complemento!: string;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public is_principal!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Endereco.init(
  {
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'enderecos',
  }
);

export default Endereco;
