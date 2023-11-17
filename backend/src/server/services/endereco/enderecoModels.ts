import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';
import Pessoa from '../pessoa/pessoaModels';



//modelo para tabela endereço
class Endereco extends Model {
  public id!: number;
  public cep!: string;
  public logradouro!: string;
  public numero!: string;
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
    },
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
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
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
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pessoa',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Endereco',
  }
);

// Defina as relações entre os modelos
//Endereco.belongsTo(Pessoa);
export default Endereco;