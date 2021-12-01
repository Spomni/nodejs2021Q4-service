const { create: RouteRegistrator } = require('../../common/route-registrator')

const {
  createTask,
  getAllTasks,
  getTaskById,
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
  },
  {
    method: 'get',
    path: '/:taskId',
    handler: getTaskById,
  },
]

async function taskRouter(fastify) {
  RouteRegistrator(fastify)
    .register(routeList)
}

module.exports = taskRouter
