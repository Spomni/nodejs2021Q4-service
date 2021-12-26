import { FastifyInstance } from "fastify";
import { RouteRegistrant, RouteConfig } from "../../common/route-registrant";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from "./user.handlers";

const routeList = [
  {
    method: 'get',
    path: '/',
    handler: getAllUsers,
  },
  {
    method: 'get',
    path: '/:userId',
    handler: getUser,
  },
  {
    method: 'post',
    path: '/',
    handler: createUser,
  },
  {
    method: 'put',
    path: '/:userId',
    handler: updateUser,
  },
  {
    method: 'delete',
    path: '/:userId',
    handler: removeUser,
  },
] as RouteConfig[]

/**
 * Register routes of the users requests
 *
 * @param fastify - instance to register routes
 */
export async function userRouter(fastify: FastifyInstance) {
  RouteRegistrant.create(fastify)
    .register(routeList)
}
