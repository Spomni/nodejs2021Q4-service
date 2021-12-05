const Board = require('./board.model')
const boardRepo = require('./board.memory.repository')
const columnService = require('../columns/column.service')

async function wakeUpBoard(stored) {
  const columns = await columnService.getById(stored.columns)
  return new Board({ ...stored, columns })
}

function byId(boardId) {
  return ({ id }) => id === boardId
}

async function storeBoard(board) {
  const [ storableBoard, storableColumns ] = board.toStorage()
 
  await Promise.all([
    boardRepo.add(storableBoard),
    columnService.create(storableColumns)
  ])
}

module.exports = {
  wakeUpBoard,
  byId,
  storeBoard,
}