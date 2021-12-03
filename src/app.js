const Fastify = require('fastify')

const swaggerUI = require('./resources/doc/swagger-ui')
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { NODE_ENV } = require('./common/config')
const { create: createRegistrant } = require('./common/route-registrant')

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
]

function createApp() {

  const app = Fastify({
    ...(isModeDev() ? logWarn() : logNothing()),
  })

  createRegistrant(app)
    .register(routeList)

  return app
}

module.exports = createApp()
