import { Task } from './task.model'
import { taskRepository as taskRepo } from './task.memory.repository'
import { ITask, ITaskToStore } from '../../contract/resources/task.contract'

import {
  storeTask,
  wakeUpTask,
  byId,
  byBoardId,
  byUserId,
  byColumnId,
} from './task.service.helpers'

/**
 * Get a task with passed id
 *
 * @param taskId - board id
 * @returns board or null if the task is not found
 */
async function getById(taskId: string) {
  const stored = await taskRepo.getOnce(byId(taskId))

  if (!stored) return null

  const task = await wakeUpTask(stored)
  return task.toResponse()
}

/**
 * Create and store a new task
 *
 * @param taskLike - data to create task
 * @returns created task
 */
async function create(taskLike: ITask) {
  const task = new Task(taskLike)
  await storeTask(task)
  return getById(task.id)
}

/**
 * Get all stored tasks with passed boardId
 *
 * @param boardId - board id
 *
 * @returns an array of tasks
 */
async function getAllByBoardId(boardId: string) {
  const storedList = await taskRepo.get(byBoardId(boardId))

  const taskList = await Promise.all(
    storedList.map(wakeUpTask)
  )

  return taskList.map(Task.toResponse)
}

/**
 * Remove all tasks with passed id
 *
 * @param taskId - task id
 */
async function removeById(taskId: string) {
  await taskRepo.remove(byId(taskId))
}

/**
 * Remove all task with passed columnId
 *
 * @param columnId - column id
 */
async function removeByColumnId(columnId: string) {
  await taskRepo.remove(byColumnId(columnId))
}

/**
 * Remove all task with passed boardId
 *
 * @param boardId - board id
 */
async function removeByBoardId(boardId: string) {
  await taskRepo.remove(byBoardId(boardId))
}

/**
 * Update a stored task
 *
 * @param taskId - board id
 * @param toUpdate - an object to update a task
 *
 * @returns updated task
 */
async function updateById(taskId: string, toUpdate: ITask) {
  const task = new Task(toUpdate)

  await removeById(taskId)
  await storeTask(task)

  return getById(task.id)
}

/**
 * Find all tasks with passed userId and set one to null
 *
 * @param userId - user id
 */
async function unassignUser(userId: string) {
  const storedList = await taskRepo.get(byUserId(userId))

  await Promise.all(
    storedList.map(async (stored) => {
      const toUpdate = { ...stored, userId: null } as ITaskToStore
      return updateById(stored.id, toUpdate)
    })
  )
}

export {
  create,
  getAllByBoardId,
  getById,
  updateById,
  removeById,
  removeByColumnId,
  removeByBoardId,
  unassignUser,
}