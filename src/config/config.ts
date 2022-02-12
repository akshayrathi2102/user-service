import dotenv from 'dotenv';

dotenv.config();

// server config

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3001;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

// database config
const DB_HOSTNAME = process.env.DB_HOSTNAME || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'user_microservice';
const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;

const DATABASE = {
  host: DB_HOSTNAME,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
};

// JWT

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret';

const AUTHENTICATION = {
  accessTokenSecret: ACCESS_TOKEN_SECRET
};

export const config = {
  server: SERVER,
  database: DATABASE,
  auth: AUTHENTICATION
};
