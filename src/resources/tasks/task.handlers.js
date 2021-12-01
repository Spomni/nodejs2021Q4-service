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

module.exports = {
  createTask,
  getAllTasks,
}
