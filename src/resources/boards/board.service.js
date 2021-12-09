const Board = require('./board.model')
const { boardRepository: boardRepo } = require('./board.memory.repository')
const columnService = require('../columns/column.service')
const taskService = require('../tasks/task.service')

const {
  wakeUpBoard,
  byId,
  storeBoard,
} = require('./board.service.helpers')

async function getAll() {

  const storedList = await boardRepo.getAll()

  const boards = await Promise.all(
    storedList.map(wakeUpBoard)
  )

  return boards.map(Board.toResponse)
}

async function getById(boardId) {
  const stored = await boardRepo.getOnce(byId(boardId))

  if (!stored) return null

  const board = await wakeUpBoard(stored)
  return board.toResponse()
}

async function create(boardLike) {
  const board = new Board(boardLike)

  await storeBoard(board)

  return getById(board.id)
}

async function removeById(boardId) {

  await Promise.all([
    boardRepo.remove(byId(boardId)),
    columnService.removeByBoardId(boardId),
    taskService.removeByBoardId(boardId)
  ])
}

async function updateById(boardId, toUpdate) {

  await removeById(boardId)

  await storeBoard(new Board(toUpdate))

  return getById(boardId)
}

module.exports = {
  create,
  getAll,
  getById,
  removeById,
  updateById,
}