import * as dotenv from 'dotenv' 
dotenv.config()

const { env } = process;
 
export const pg = {
  host: env.PG_HOST, 
  port: env.PG_PORT, 
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DB_NAME,
  migrationsTable: env.PG_MIGRATIONS_TABLE,
  maxPool: 75,
  minPool: 2,
};

export const serverConfig = {
  port: env.PORT, 
  nodeEnv: env.NODE_ENV  
};
  