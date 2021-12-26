import Pino from "pino";
import { LOG_LEVEL } from "./config";

const level = (LOG_LEVEL === undefined) ? 'trace' : LOG_LEVEL

export const logger = Pino({
  level,
  transport: {
    target: 'pino-pretty'
  },
})