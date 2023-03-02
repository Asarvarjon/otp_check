import knex from 'knex';
import knexConfig from './knexfile';
import { serverConfig } from '../config/conf';

const knexInstance = knex(knexConfig[serverConfig.nodeEnv]);

export default knexInstance;
