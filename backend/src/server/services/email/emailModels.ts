import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';


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
      allowNull: false,
      autoIncrement: true,
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    is_principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
  },
  {
    modelName: 'Email',
    sequelize,


  }
);

//Email.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });

export default Email;