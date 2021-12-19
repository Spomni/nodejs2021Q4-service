import { FastifyReply, FastifyRequest } from "fastify";
import { IUserToCreate } from "../../contract/resources/user.contract";
import * as usersService from "./user.service";

type RequestByUserId = FastifyRequest<{
  Params: { userId: string }
}>

type RequestWithUser = FastifyRequest<{
  Body: IUserToCreate,
}>

/**
 * Handle request to get all stored users
 *
 * @returns all stored users
 */
async function getAllUsers() {
  return usersService.getAll()
}

/**
 * Handle request to get a user
 *
 * @param req - request to get user
 *
 * @returns user or nothing if it is not found
 */
async function getUser(req: RequestByUserId) {
  const { userId } = req.params
  return usersService.getById(userId)
}

/**
 * Handle request to create a new user
 *
 * @param req - request to create a user
 * @param reply - fastify reply object
 *
 * @returns created user
 */
async function createUser(req: RequestWithUser, reply: FastifyReply) {
  const user = await usersService.create(req.body);
  reply.code(201)
  return user
}

/**
 * Handle request to update a user
 *
 * @param req - request to update a user
 *
 * @returns updated user
 */
async function updateUser(req: RequestByUserId & RequestWithUser) {
  const { userId } = req.params
  return usersService.updateById(userId, req.body)
}

/**
 * Handle request to remove a user
 *
 * @param req - request to remove a user
 * @param reply - fastify reply object
 */
async function removeUser(req: RequestByUserId, reply: FastifyReply) {
  await usersService.removeById(req.params.userId)
  reply.code(204)
}

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
}
