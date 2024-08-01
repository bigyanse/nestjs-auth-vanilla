import { DataSource } from "typeorm";
import "dotenv/config";

export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/entities/*.entity.js"],
  synchronize: false,
  migrations: ["migrations/**/*.ts"],
});
