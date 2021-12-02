const path = require('path');

const Fastify = require('fastify')
const fastifySwagger = require('fastify-swagger')
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { create: createRegistrant } = require('./common/route-registrant')

const swaggerOptions = {
  mode: 'static',
  exposeRoute: true,
  routePrefix: '/doc',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
}

const fastifyOptions = {

  logger: (process.env.NODE_ENV === 'development')
    ? { level: 'warn', prettyPrint: true }
    : false,
}

const routeList = [
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

async function createApp() {

  const app = Fastify(fastifyOptions)

  createRegistrant(app)
    .register(routeList)

  await app.register(fastifySwagger, swaggerOptions)

  app.all('/', () => 'Service is running!')

  return app
}

module.exports = {
  createApp,
}