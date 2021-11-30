const Board = require('./board.model')
const boardRepo = require('./board.memory.repository')
const columnService = require('../columns/column.service')

async function wakeUpBoard(stored) {
  const columns = await columnService.getById(stored.columns)
  return new Board({ ...stored, columns })
}

async function create(boardLike) {
  const board = new Board(boardLike)
  
  const [ storableBoard, storableColumns ] = board.toStorage()

  boardRepo.add(storableBoard)
  columnService.create(storableColumns)
  
  return board.toResponse()
}

async function getAll() {

  const storedList = await boardRepo.getAll()

  const boards = await Promise.all(
    storedList.map(async (stored) => wakeUpBoard(stored))
  )

  return boards.map(Board.toResponse)
}

async function getById(boardId) {
  const stored = boardRepo.getOnce(({ id }) => id === boardId)
  const board = await wakeUpBoard(stored)
  return board.toResponse()
}

module.exports = {
  create,
  getAll,
  getById,
}
