const taskRepo = require('./task.memory.repository')
const Task = require('./task.model')

async function storeTask(task) {
  taskRepo.add(task.toStorage())
}

function byId(targetId) {
  return ({ id }) => id === targetId
}

function byBoardId(targetBoardId) {
  return ({ boardId }) => boardId === targetBoardId
}

async function wakeUpTask(stored) {
  return new Task(stored)
}

module.exports = {
  storeTask,
  byId,
  byBoardId,
  wakeUpTask,
}
