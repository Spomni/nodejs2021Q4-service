import { fastify as Fastify } from "fastify";
import { swaggerUI } from './resources/doc/swagger-ui'
import { userRouter } from './resources/users/user.router'
import { boardRouter } from './resources/boards/board.router'
import { taskRouter } from './resources/tasks/task.router'

import { logger } from "./common/logger";
import { RouteRegistrant, RouteConfig, PluginConfig } from './common/route-registrant'

const routeList = [
  {
    method: 'all',
    path: '/',
    handler: () => 'Service is running!'
  },
  {
    options: { prefix: '/doc' },
    plugin: swaggerUI,
  },
  {
    options: { prefix: '/users' },
    plugin: userRouter,
  },
  {
    options: { prefix: '/boards' },
    plugin: boardRouter,
  },
  {
    options: { prefix: '/boards/:boardId/tasks' },
    plugin: taskRouter,
  }
] as Array<RouteConfig | PluginConfig>

/**
 * Create a new application
 *
 * @returns application
 */
function createApp() {

  const app = Fastify({
    logger,
  })

  RouteRegistrant.create(app)
    .register(routeList)

  return app
}

process.on('uncaughtException', (error) => logger.error(error))
process.on('unhandledRejection', (error) => logger.error(error))

export const app = createApp()
