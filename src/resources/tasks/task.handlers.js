const taskService = require('./task.service')

async function createTask(req, reply) {
  const { boardId } = req.params
  
  const task = await taskService.create({ ...req.body, boardId })
  
  reply.code(201)
  return task
}

module.exports = {
  createTask,
}