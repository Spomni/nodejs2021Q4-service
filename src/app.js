const Fastify = require('fastify')

const swaggerUI = require('./resources/doc/swagger-ui')
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { create: createRegistrant } = require('./common/route-registrant')

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
]

const fastifyOptions = {

  logger: (process.env.NODE_ENV === 'development')
    ? { level: 'warn', prettyPrint: true }
    : false,
}

async function createApp() {

  const app = Fastify(fastifyOptions)

  createRegistrant(app)
    .register(routeList)

  return app
}

module.exports = {
  createApp,
}