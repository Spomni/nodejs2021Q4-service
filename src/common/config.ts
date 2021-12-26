import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const {
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  LOG_LEVEL,
} = process.env

const PORT = process.env.PORT || 3000

const AUTH_MODE = process.env.AUTH_MODE === 'true'

const LOG_OUTPUT = (process.env.LOG_OUTPUT)
  ? path.resolve(__dirname, '../../', process.env.LOG_OUTPUT)
  : null

const ERR_OUTPUT = (process.env.ERR_OUTPUT)
  ? path.resolve(__dirname, '../../', process.env.ERR_OUTPUT)
  : null

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  LOG_LEVEL,
  LOG_OUTPUT,
  ERR_OUTPUT,
}
