import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';



//modelo para a tabela 'Pessoa'
class Pessoa extends Model {
  public id!: number;
  public nome!: string;
  public identificacao!: string;
  public nome_fantasia!: string | null;
  public nome_mae!: string | null;
  public inscricao_municipal!: string | null;
  public inscricao_estadual!: string | null;
}

Pessoa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo nome não pode ser vazio'
        }
      },
    },
    // O campo identificação pode ser um CPF ou CNPJ válido
    identificacao: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      // A identificação não pode ser alterada
      set(value: string) {
        if (this.identificacao) {
          throw new Error('A identificação não pode ser alterada');
        }
        this.setDataValue('identificacao', value);
      },
      validate: {
        notEmpty: {
          msg: 'O campo identificação não pode ser vazio'
        },
        isCpfOrCnpj(value: string) {
          const cpfCnpjRegex = /^(\d{11}|\d{14})$/;
          if (!cpfCnpjRegex.test(value)) {
            throw new Error('O campo identificação deve ser um CPF ou CNPJ válido');
          }
          if (value.length === 11 && !this.nome_mae) {
            throw new Error('O campo nome da mãe é obrigatório para pessoas físicas');
          } else if (value.length === 14 && !this.nome_fantasia) {
            throw new Error('O campo nome fantasia é obrigatório para pessoas jurídicas');
          }
        },
      },
    },
    nome_fantasia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nome_mae: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inscricao_municipal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inscricao_estadual: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Pessoa',
  }
);
//Defina as relações entre os modelos

//Pessoa.hasMany(Telefone, { foreignKey: 'id_pessoa' });
//Pessoa.hasMany(Email, { foreignKey: 'id_pessoa' });
//Pessoa.hasOne(Cliente, { foreignKey: 'id_pessoa' });
//Pessoa.hasOne(Representante, { foreignKey: 'id_pessoa' });

export default Pessoa;
