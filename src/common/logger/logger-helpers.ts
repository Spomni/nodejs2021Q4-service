import Pino from "pino";
import type { FastifyRequest } from "fastify"
import { ensureFileSync } from "fs-extra";

export function logToConsole(
  targets: Pino.TransportTargetOptions[],
  level: Pino.LevelWithSilent,
) {
  targets.push({
    level,
    target: 'pino-pretty',
    options: {}
  })
}

export function logToPath(
  targets: Pino.TransportTargetOptions[],
  level: Pino.LevelWithSilent,
  destination: string
) {

  ensureFileSync(destination)

  targets.push({
    level,
    target: 'pino-pretty',
    options: {
      destination,
      colorize: false,
    }
  })
}

export function serializeRequest(request: FastifyRequest) {
  return {
    url: request.url,
    method: request.method,
    query: request.query,
    body: request.body,
    hostname: request.hostname,
  }
}
