import Pino from "pino";
import { LOG_LEVEL, LOG_OUTPUT, ERR_OUTPUT } from "./config";

const level = (LOG_LEVEL === null) ? 'trace' : LOG_LEVEL as Pino.LevelWithSilent

const targets = [
  {
    level,
    target: 'pino-pretty',
    options: {},
  },
] as Pino.TransportTargetOptions[]

if (LOG_OUTPUT) {
  targets.push({
    level,
    target: 'pino/file',
    options: { destination: LOG_OUTPUT }
  })
}

if (ERR_OUTPUT) {
  targets.push({
    level: 'error',
    target: 'pino/file',
    options: { destination: ERR_OUTPUT }
  })
}

export const logger = Pino({
  level,
  transport: {
    targets,
  },
})