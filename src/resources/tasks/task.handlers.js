const taskService = require('./task.service')

async function createTask(req, reply) {
  const { boardId } = req.params
  
  const task = await taskService.create({ ...req.body, boardId })
  
  reply.code(201)
  return task
}

async function getAllTasks(req) {
  const { boardId } = req.params
  const tasks = await taskService.getAllByBoardId(boardId)
  return tasks
}

async function getTaskById(req, reply) {
  const { taskId } = req.params
  const task = await taskService.getById(taskId)
  return task || reply.callNotFound()
}

async function updateTask(req) {
  const { taskId } = req.params
  const task = await taskService.updateById(taskId, req.body)
  return task
}

async function deleteTask(req, reply) {
  const { taskId } = req.params
  await taskService.deleteById(taskId)
  reply.code(204)
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
