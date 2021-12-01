const { create: RouteRegistrator } = require('../../common/route-registrator')

const {
  createTask,
  getAllTasks,
} = require('./task.handlers')

const routeList = [
  {
    method: 'post',
    path: '/',
    handler: createTask,
  },
  {
    method: 'get',
    path: '/',
    handler: getAllTasks,
  }
]

async function taskRouter(fastify) {
  RouteRegistrator(fastify)
    .register(routeList)
}

module.exports = taskRouter
