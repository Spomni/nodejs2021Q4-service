const { create: RouteRegistrator } = require('../../common/route-registrator')

const {
  createTask,
} = require('./task.handlers')

const routeList = [
  {
    method: 'post',
    path: '/',
    handler: createTask
  },
]

async function taskRouter(fastify) {
  RouteRegistrator(fastify)
    .register(routeList)
}

module.exports = taskRouter
