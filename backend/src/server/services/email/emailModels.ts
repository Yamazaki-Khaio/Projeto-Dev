import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

class Email extends Model {
  public id!: number;
  public email!: string;
  public isPrimary!: boolean;
}

Email.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPrimary: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'emails',
});
