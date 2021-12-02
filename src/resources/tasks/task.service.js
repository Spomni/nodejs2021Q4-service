const Task = require('./task.model')
const taskRepo = require('./task.memory.repository')

const {
  storeTask,
  wakeUpTask,
  byId,
  byBoardId,
  byUserId,
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

async function removeById(taskId) {
  await taskRepo.remove(byId(taskId))
}

async function updateById(taskId, toUpdate) {
  const task = new Task(toUpdate)

  await removeById(taskId)
  await storeTask(task)

  return getById(task.id)
}

async function unassignUser(userId) {
  const storedList = taskRepo.get(byUserId(userId))

  await Promise.all(
    storedList.map(async (stored) => {
      const toUpdate = { ...stored, userId: null }
      return updateById(stored.id, toUpdate)
    })
  )
}

module.exports = {
  create,
  getAllByBoardId,
  getById,
  updateById,
  removeById,
  unassignUser,
}