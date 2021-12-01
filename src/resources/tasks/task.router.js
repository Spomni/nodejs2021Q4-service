const { create: RouteRegistrator } = require('../../common/route-registrator')

const {
  createTaskOnBoard,
  getAllTasksOnBoard,
  getTask,
  updateTask,
  deleteTask,
} = require('./task.handlers')

const routeList = [
  {
    method: 'post',
    path: '/',
    handler: createTaskOnBoard,
  },
  {
    method: 'get',
    path: '/',
    handler: getAllTasksOnBoard,
  },
  {
    method: 'get',
    path: '/:taskId',
    handler: getTask,
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
