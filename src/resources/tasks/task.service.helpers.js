const taskRepo = require('./task.memory.repository')
const Task = require('./task.model')

async function storeTask(task) {
  taskRepo.add(task.toStorage())
}

function byId(targetId) {
  return ({ id }) => id === targetId
}

async function wakeUpTask(stored) {
  return new Task(stored)
}

module.exports = {
  storeTask,
  byId,
  wakeUpTask,
}
