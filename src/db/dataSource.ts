import { DataSource } from "typeorm";
import { join } from "path";
import config from '../utils/environment'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  username: config.DB_USERNAME,
  database: config.DB_NAME,
  port: Number(config.DB_PORT),
  entities: [join(__dirname, 'entities/*{.js,.ts}')],
  migrations: [join(__dirname, 'migrations/*{.js,.ts}')],
  synchronize: config.DB_SYNC === 'true',
})