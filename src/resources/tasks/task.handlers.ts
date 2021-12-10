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

async function createTaskOnBoard(req: RequestWithTask, reply: FastifyReply) {
  const { boardId } = req.params

  const task = await taskService.create({ ...req.body, boardId })

  reply.code(201)
  return task
}

async function getAllTasksOnBoard(req: RequestByTaskId) {
  const { boardId } = req.params
  return taskService.getAllByBoardId(boardId)
}

async function getTask(req: RequestByTaskId, reply: FastifyReply) {
  const { taskId } = req.params
  const task = await taskService.getById(taskId)
  return task || reply.callNotFound()
}

async function updateTask(req: RequestWithTask & RequestByTaskId) {
  const { taskId } = req.params
  return taskService.updateById(taskId, req.body)
}

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
