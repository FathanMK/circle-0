import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/../entities/*.entities.ts"],
  migrations: [__dirname + "/../migrations/*.migrations.ts"],
  subscribers: [],
});

export default AppDataSource;
