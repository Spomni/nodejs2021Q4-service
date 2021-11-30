const Board = require('./board.model')
const boardRepo = require('./board.memory.repository')
const columnService = require('../columns/column.service')

async function create(boardLike) {
  const board = new Board(boardLike)
  
  const [ storableBoard, storableColumns ] = board.toStorage()

  boardRepo.add(storableBoard)
  columnService.create(storableColumns)
  
  return board.toResponse()
}

module.exports = {
  create,
}
