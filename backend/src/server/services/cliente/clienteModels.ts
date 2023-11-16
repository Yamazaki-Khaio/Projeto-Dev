import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import Pessoa from '../pessoa/pessoaModels';

class Cliente extends Model {
  public pessoaId!: number;
  public situacao!: string;
  public readonly createdAt!: Date;

  public readonly pessoa?: Pessoa;

  public static initialize() {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        pessoaId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'pessoas',
            key: 'id',
          },
        },
        situacao: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: 'ativo',
        },
      },
      {
        sequelize,
        tableName: 'clientes',
        timestamps: true,
        createdAt: true,
        updatedAt: false,
      }
    );
  }

  public static associate() {
    this.belongsTo(Pessoa, { foreignKey: 'pessoaId', as: 'pessoas' });
  }

}



Cliente.initialize();

export default Cliente;
