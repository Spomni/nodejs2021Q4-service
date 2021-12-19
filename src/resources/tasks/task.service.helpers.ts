import { taskRepository as taskRepo } from './task.memory.repository'
import { Task } from './task.model'
import { ITaskToStore } from '../../contract/resources/task.contract'

/**
 * Store a task
 *
 * @param task - task model
 */
async function storeTask(task: Task) {
  taskRepo.add(task.toStorage())
}

/**
 * Wake up a task model from the stored one
 *
 * @param stored - task from storage
 *
 * @returns task model
 */
async function wakeUpTask(stored: ITaskToStore) {
  return Task.create(stored)
}

/**
 * Create a function to check if the task has a passed id
 *
 * @param taskId - board id
 *
 * @returns function to check
 */
function byId(targetId: string) {
  return ({ id }: ITaskToStore) => id === targetId
}

/**
 * Create a function to check if the task has the boardId property equals to passed board id
 *
 * @param targetBoardId - board id
 *
 * @returns function to check
 */
function byBoardId(targetBoardId: string) {
  return ({ boardId }: ITaskToStore) => boardId === targetBoardId
}

/**
 * Create a function to check if the task has the userId property equals to passed user id
 *
 * @param targetUserId - user id
 *
 * @returns function to check
 */
function byUserId(targetUserId: string) {
  return ({ userId }: ITaskToStore) => userId === targetUserId
}

/**
 * Create a function to check if the task has the columnId property equals to passed column id
 *
 * @param targetColumnId - column id
 *
 * @returns function to check
 */
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