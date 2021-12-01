const path = require('path');

const Fastify = require('fastify')
const fastifySwagger = require('fastify-swagger')
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

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

async function createApp() {
  
  const app = Fastify(fastifyOptions)

  await app.register(fastifySwagger, swaggerOptions)
  
  app.all('/', () => 'Service is running!')

  await app.register(userRouter, { prefix: '/users' })
  await app.register(boardRouter, { prefix: '/boards' })
  await app.register(taskRouter, { prefix: '/boards/:boardId/tasks' })
  
  return app
}

module.exports = {
  createApp,
}