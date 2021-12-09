import { FastifyReply, FastifyRequest } from "fastify";
import { IUserToCreate } from "../../contract/resources/user.contract";
import * as usersService from "./user.service";

type RequestByUserId = FastifyRequest<{
  Params: { userId: string }
}>

type RequestWithUser = FastifyRequest<{
  Body: IUserToCreate,
}>

async function getAllUsers() {
  return usersService.getAll()
}

async function getUser(req: RequestByUserId) {
  const { userId } = req.params
  return usersService.getById(userId)
}

async function createUser(req: RequestWithUser, reply: FastifyReply) {
  const user = await usersService.create(req.body);
  reply.code(201)
  return user
}

async function updateUser(req: RequestByUserId & RequestWithUser) {
  const { userId } = req.params
  return usersService.updateById(userId, req.body)
}

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
