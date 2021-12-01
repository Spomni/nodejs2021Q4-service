const taskService = require('./task.service')

async function createTaskOnBoard(req, reply) {
  const { boardId } = req.params
  
  const task = await taskService.create({ ...req.body, boardId })
  
  reply.code(201)
  return task
}

async function getAllTasksOnBoard(req) {
  const { boardId } = req.params
  return taskService.getAllByBoardId(boardId)
}

async function getTask(req, reply) {
  const { taskId } = req.params
  const task = await taskService.getById(taskId)
  return task || reply.callNotFound()
}

async function updateTask(req) {
  const { taskId } = req.params
  return taskService.updateById(taskId, req.body)
}

async function deleteTask(req, reply) {
  const { taskId } = req.params
  await taskService.deleteById(taskId)
  reply.code(204)
}

module.exports = {
  createTaskOnBoard,
  getAllTasksOnBoard,
  getTask,
  updateTask,
  deleteTask,
}
