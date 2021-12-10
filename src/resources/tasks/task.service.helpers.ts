import { taskRepository as taskRepo } from './task.memory.repository'
import { Task } from './task.model'
import { ITaskToStore } from '../../contract/resources/task.contract'

async function storeTask(task: Task) {
  taskRepo.add(task.toStorage())
}

async function wakeUpTask(stored: ITaskToStore) {
  return Task.create(stored)
}

function byId(targetId: string) {
  return ({ id }: ITaskToStore) => id === targetId
}

function byBoardId(targetBoardId: string) {
  return ({ boardId }: ITaskToStore) => boardId === targetBoardId
}

function byUserId(targetUserId: string) {
  return ({ userId }: ITaskToStore) => userId === targetUserId
}

function byColumnId(targetColumnId: string) {
  return ({ columnId }: ITaskToStore) => columnId === targetColumnId
}

export {
  storeTask,
  wakeUpTask,
  byId,
  byBoardId,
  byUserId,
  byColumnId,
}