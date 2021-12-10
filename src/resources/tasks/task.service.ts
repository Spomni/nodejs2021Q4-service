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

async function getById(taskId: string) {
  const stored = await taskRepo.getOnce(byId(taskId))

  if (!stored) return null

  const task = await wakeUpTask(stored)
  return task.toResponse()
}

async function create(taskLike: ITask) {
  const task = new Task(taskLike)
  await storeTask(task)
  return getById(task.id)
}

async function getAllByBoardId(boardId: string) {
  const storedList = await taskRepo.get(byBoardId(boardId))

  const taskList = await Promise.all(
    storedList.map(wakeUpTask)
  )

  return taskList.map(Task.toResponse)
}

async function removeById(taskId: string) {
  await taskRepo.remove(byId(taskId))
}

async function removeByColumnId(columnId: string) {
  await taskRepo.remove(byColumnId(columnId))
}

async function removeByBoardId(boardId: string) {
  await taskRepo.remove(byBoardId(boardId))
}

async function updateById(taskId: string, toUpdate: ITask) {
  const task = new Task(toUpdate)

  await removeById(taskId)
  await storeTask(task)

  return getById(task.id)
}

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