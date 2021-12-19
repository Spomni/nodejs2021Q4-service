import { FastifyReply, FastifyRequest } from "fastify"
import * as taskService from './task.service'
import { ITask } from '../../contract/resources/task.contract'

type RequestByTaskId = FastifyRequest<{
  Params: { boardId: string, taskId: string }
}>

type RequestWithTask = FastifyRequest<{
  Body: ITask,
  Params: { boardId: string }
}>

/**
 * Handle request to create a new task
 *
 * @param req - request to create a task
 * @param reply - fastify reply object
 *
 * @returns created task
 */
async function createTaskOnBoard(req: RequestWithTask, reply: FastifyReply) {
  const { boardId } = req.params

  const task = await taskService.create({ ...req.body, boardId })

  reply.code(201)
  return task
}

/**
 * Handle request tot get all tasks of the board
 *
 * @param req - request to get tasks
 *
 * @returns an array of tasks
 */
async function getAllTasksOnBoard(req: RequestByTaskId) {
  const { boardId } = req.params
  return taskService.getAllByBoardId(boardId)
}

/**
 * handle request to get a task
 *
 * @param req - request to get task
 * @param reply - fastify reply object
 *
 * @returns task or nothing if it is not found
 */
async function getTask(req: RequestByTaskId, reply: FastifyReply) {
  const { taskId } = req.params
  const task = await taskService.getById(taskId)
  return task || reply.callNotFound()
}

/**
 * Handle request to update a task
 *
 * @param req - request to update task
 *
 * @returns updated task
 */
async function updateTask(req: RequestWithTask & RequestByTaskId) {
  const { taskId } = req.params
  return taskService.updateById(taskId, req.body)
}

/**
 * Handle request to remove a task
 *
 * @param req - request to remove task
 * @param reply - fastify reply object
 */
async function removeTask(req: RequestByTaskId, reply: FastifyReply) {
  const { taskId } = req.params
  await taskService.removeById(taskId)
  reply.code(204)
}

export {
  createTaskOnBoard,
  getAllTasksOnBoard,
  getTask,
  updateTask,
  removeTask,
}
