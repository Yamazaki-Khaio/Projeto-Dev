import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_URI);
const sequelize = new Sequelize(process.env.DB_URI as string);

export default sequelize;
