const { create: RouteRegistrator } = require('../../common/route-registrator')

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
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
  {
    method: 'put',
    path: '/:taskId',
    handler: updateTask,
  },
  {
    method: 'delete',
    path: '/:taskId',
    handler: deleteTask,
  },
]

async function taskRouter(fastify) {
  RouteRegistrator(fastify)
    .register(routeList)
}

module.exports = taskRouter
