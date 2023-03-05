
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
  nodeEnv: env.NODE_ENV || 'development'
};

export const OtpConfig = {
  otp_exp_time: env.otp_exp_time,
  resend_delay: env.resend_delay,
  req_temp_limit: env.req_temp_limit,
  req_perm_limit: env.req_perm_limit,
  fail_temp_limit: env.fail_temp_limit,
  fail_perm_limit: env.fail_perm_limit,
  temp_block_duration: env.temp_block_duration
}
  
 