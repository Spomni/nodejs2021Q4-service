import { userRepository as userRepo } from "./user.memory.repository";
import { User } from "./user.model";
import * as taskService from "../tasks/task.service";
import {
  IUserToStore,
  IUserToCreate,
} from "../../contract/resources/user.contract";

function byId(targetId: string) {
  return ({ id }: IUserToStore) => id === targetId
}

async function getAll() {
  const storedList = await userRepo.getAll()
  return storedList.map(User.toResponse)
}

async function getById(userId: string) {
  const stored = await userRepo.getOnce(byId(userId))
  return User.create(stored).toResponse()
}

async function create(userLike: IUserToCreate) {
  const user = User.create(userLike)
  await userRepo.add(user.toStorage())
  return getById(user.id)
}

async function updateById(userId: string, toUpdate: IUserToCreate) {

  const user = User.create(toUpdate)

  await userRepo.remove(byId(userId))
  await userRepo.add(user.toStorage())

  return getById(user.id)
}

async function removeById(userId: string) {
  await userRepo.remove(byId(userId))
  await taskService.unassignUser(userId)
}

export {
  getAll,
  create,
  getById,
  removeById,
  updateById,
}
