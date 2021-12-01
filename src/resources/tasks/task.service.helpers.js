const taskRepo = require('./task.memory.repository')
const Task = require('./task.model')

async function storeTask(task) {
  taskRepo.add(task.toStorage())
}

async function wakeUpTask(stored) {
  return new Task(stored)
}

function byId(targetId) {
  return ({ id }) => id === targetId
}

function byBoardId(targetBoardId) {
  return ({ boardId }) => boardId === targetBoardId
}

function byUserId(targetUserId) {
  return ({ userId }) => userId === targetUserId
}

module.exports = {
  storeTask,
  wakeUpTask,
  byId,
  byBoardId,
  byUserId,
}