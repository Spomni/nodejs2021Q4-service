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

async function getTaskById(req) {
  const { taskId } = req.params
  const task = await taskService.getById(taskId)
  return task
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
}
