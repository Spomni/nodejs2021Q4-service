import Pino from "pino";

import {
  LOG_LEVEL,
  LOG_OUTPUT,
  ERR_OUTPUT
} from "../config";

import {
  logToConsole,
  logToPath,
  serializeRequest
} from "./logger-helpers";

const level = (LOG_LEVEL === null)? 'trace': LOG_LEVEL as Pino.LevelWithSilent
const targets = [] as Pino.TransportTargetOptions[]

logToConsole(targets, level)

if (LOG_OUTPUT) logToPath(targets, level, LOG_OUTPUT)
if (ERR_OUTPUT) logToPath(targets, 'error', ERR_OUTPUT)

export const logger = Pino({
  serializers: {
    req: serializeRequest
  },
  transport: {
    targets,
  },
})
