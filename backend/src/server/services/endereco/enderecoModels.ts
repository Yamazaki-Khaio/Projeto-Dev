import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

//modelo para tabela endereço
class Endereco extends Model {
  public id!: number;
  public cep!: string;
  public logradouro!: string;
  public numero!: string | null;
  public complemento!: string | null;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public is_principal!: boolean;
  public id_pessoa!: number;
}

Endereco.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'O campo "CEP" é obrigatório.',
        },
      },
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo "Logradouro" é obrigatório.',
        },
      },
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo "Número" é obrigatório.',
        },
      },
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo "Bairro" é obrigatório.',
        },
      },
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo "Cidade" é obrigatório.',
        },
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo "Estado" é obrigatório.',
        },
      },
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
    modelName: 'Endereco',
    sequelize,
  }
);

// Defina as relações entre os modelos
//Endereco.belongsTo(Pessoa);

''

export default Endereco;