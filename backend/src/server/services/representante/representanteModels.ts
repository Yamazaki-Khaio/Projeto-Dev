
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

class Representante extends Model {
  public id!: number;
  public nome!: string;
  public cnpj_cpf!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Representante.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cnpj_cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'representantes',
  }
);

export default Representante;
