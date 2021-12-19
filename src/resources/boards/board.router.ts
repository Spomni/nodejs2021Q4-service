import type { FastifyInstance } from 'fastify'
import { RouteRegistrant, RouteConfig } from '../../common/route-registrant'

import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
} from './board.handlers'

const routeList = [
  {
    method: 'get',
    path: '/',
    handler: getAllBoards
  },
  {
    method: 'get',
    path: '/:boardId',
    handler: getBoard
  },
  {
    method: 'post',
    path: '/',
    handler: createBoard
  },
  {
    method: 'put',
    path: '/:boardId',
    handler: updateBoard
  },
  {
    method: 'delete',
    path: '/:boardId',
    handler: removeBoard
  },
] as RouteConfig[]

/**
 * Register routes of the board requests
 *
 * @param fastify - instance to register routes
 */
export async function boardRouter(fastify: FastifyInstance) {
  RouteRegistrant.create(fastify)
    .register(routeList)
}
