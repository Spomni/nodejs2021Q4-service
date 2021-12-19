import { userRepository as userRepo } from "./user.memory.repository";
import { User } from "./user.model";
import * as taskService from "../tasks/task.service";
import {
  IUserToStore,
  IUserToCreate,
} from "../../contract/resources/user.contract";

/**
 * Create a function to check if the user has a passed id
 *
 * @param userId - board id
 *
 * @returns function to check
 */
function byId(userId: string) {
  return ({ id }: IUserToStore) => id === userId
}

/**
 * Get all stored users
 *
 * @returns an array of users
 */
async function getAll() {
  const storedList = await userRepo.getAll()
  return storedList.map(User.toResponse)
}

/**
 * Get a user with passed id
 *
 * @param userId - user id
 * @returns user or null if the user is not found
 */
async function getById(userId: string) {
  const stored = await userRepo.getOnce(byId(userId))
  return User.create(stored).toResponse()
}

/**
 * Create and store a new user
 *
 * @param userLike - data to create user
 * @returns created user
 */
async function create(userLike: IUserToCreate) {
  const user = User.create(userLike)
  await userRepo.add(user.toStorage())
  return getById(user.id)
}

/**
 * Update a stored user
 *
 * @param userId - user id
 * @param toUpdate - an object to update a user
 * @returns updated user
 */
async function updateById(userId: string, toUpdate: IUserToCreate) {

  const user = User.create(toUpdate)

  await userRepo.remove(byId(userId))
  await userRepo.add(user.toStorage())

  return getById(user.id)
}

/**
 * remove a user with passed id
 *
 * @param userId - user id
 */
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
