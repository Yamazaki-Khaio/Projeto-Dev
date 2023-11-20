import Cliente from "./cliente/clienteModels";
import Pessoa from "./pessoa/pessoaModels";
import Representante from "./representante/representanteModels";
import Email from "./email/emailModels";
import Telefone from "./telefone/telefoneModels";
import Endereco from "./endereco/enderecoModels";
import sequelize from "../config/sequelize";




// Um cliente é uma pessoa
Cliente.hasOne(Pessoa, { foreignKey: 'id', sourceKey: 'id_pessoa' });
Cliente.hasOne(Representante, { foreignKey: 'id_pessoa', sourceKey: 'id_pessoa', onDelete: 'RESTRICT' });
// uma pessoa pode ser um cliente
// o representante é uma pessoa
Representante.hasOne(Pessoa, { foreignKey: 'id', sourceKey: 'id_pessoa' });
// o representante pertence a um cliente
Representante.belongsTo(Cliente, { foreignKey: 'id_cliente', targetKey: 'id' });

// uma pessoa pode ter muitos telefones
Pessoa.hasMany(Telefone, { foreignKey: 'id_pessoa', sourceKey: 'id' });

// um telefone pertence a uma pessoa
Telefone.belongsTo(Pessoa, { foreignKey: 'id_pessoa', targetKey: 'id' });

// email pertece a uma pessoa
Email.belongsTo(Pessoa, { foreignKey: 'id_pessoa', targetKey: 'id' });

// uma pessoa pode ter muitos emails
Pessoa.hasMany(Email, { foreignKey: 'id_pessoa', sourceKey: 'id' });

//Pessoa pode ter muitos endereços
Pessoa.hasMany(Endereco, { foreignKey: 'id_pessoa', sourceKey: 'id' });

// Endereço pertence a uma pessoa
Endereco.belongsTo(Pessoa, { foreignKey: 'id_pessoa', targetKey: 'id' });

// Pessoa pertece a um cliente
Pessoa.belongsTo(Cliente, { foreignKey: 'id_pessoa', targetKey: 'id' });


sequelize;
