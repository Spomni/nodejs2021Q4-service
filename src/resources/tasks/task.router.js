const { create: RouteRegistrant } = require('../../common/route-registrant')

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
  RouteRegistrant(fastify)
    .register(routeList)
}

module.exports = taskRouter
