import { fastify as Fastify } from "fastify";
import { swaggerUI } from './resources/doc/swagger-ui'
import { userRouter } from './resources/users/user.router'
import { boardRouter } from './resources/boards/board.router'
import { taskRouter } from './resources/tasks/task.router'

import { NODE_ENV } from './common/config'
import { RouteRegistrant, RouteConfig, PluginConfig } from './common/route-registrant'

const isModeDev = () => NODE_ENV === 'development'
const logWarn = () => ({ logger: { level: 'warn', prettyPrint: true }})
const logNothing = () => ({ logger: false })

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

function createApp() {

  const app = Fastify({
    ...(isModeDev() ? logWarn() : logNothing()),
  })

  RouteRegistrant.create(app)
    .register(routeList)

  return app
}

export const app = createApp()
