import type { FastifyInstance } from 'fastify'
import { RouteRegistrant, RouteConfig } from '../../common/route-registrant'

import {
  createTaskOnBoard,
  getAllTasksOnBoard,
  getTask,
  updateTask,
  removeTask,
} from './task.handlers'

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
    handler: removeTask,
  },
] as RouteConfig[]

export async function taskRouter(fastify: FastifyInstance) {
  RouteRegistrant.create(fastify)
    .register(routeList)
}
