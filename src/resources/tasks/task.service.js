const Task = require('./task.model')
const taskRepo = require('./task.memory.repository')

const {
  storeTask,
  wakeUpTask,
  byId,
  byBoardId,
} = require('./task.service.helpers')

async function getById(taskId) {
  const stored = await taskRepo.getOnce(byId(taskId))

  if (!stored) return null

  const task = await wakeUpTask(stored)
  return task.toResponse()
}

async function create(taskLike) {
  const task = new Task(taskLike)
  await storeTask(task)
  return getById(task.id)
}

async function getAllByBoardId(boardId) {
  const storedList = await taskRepo.get(byBoardId(boardId))
  
  const taskList = await Promise.all(
    storedList.map(wakeUpTask)
  )
  
  return taskList.map(Task.toResponse)
}

async function deleteById(taskId) {
  await taskRepo.remove(byId(taskId))
}

async function updateById(taskId, toUpdate) {
  const task = new Task(toUpdate)
  
  await deleteById(taskId)
  await storeTask(task)
  
  return getById(task.id)
}

module.exports = {
  create,
  getAllByBoardId,
  getById,
  updateById,
  deleteById,
}
