import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(process.env.DB_URI as string);

sequelize.authenticate().then(() => {
  console.log("Conexão com o banco de dados estabelecida com sucesso.");
})
  .catch((error) => {
    console.error("Não foi possível conectar-se ao banco de dados:", error);
  });

sequelize.sync({ force: true }).then(() => {
  console.log("Tabelas criadas com sucesso.");
}).catch((error) => {
  console.error("Não foi possível criar o schema:", error);
  console.error("Não foi possível criar as tabelas:", error);
});

sequelize.createSchema('public', {}).then(() => {
  console.log("Schema criado com sucesso.");
}).catch((error) => {
  console.error("Não foi possível criar o schema:", error);
});






export default sequelize;
