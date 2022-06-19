// ORM인 Sqquelize를 이용하여 Mysql에 연결

import { config } from '../config.js';
import SQ from 'sequelize';

/* With Sequelize */ 
const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

