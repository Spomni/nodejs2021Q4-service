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

async function getAll() {

  const storedList = await boardRepo.getAll()

  const boards = await Promise.all(
    storedList.map(async (stored) => {

      const columns = await columnService.getById(stored.columns)
      return new Board({ ...stored, columns })
    })
  )

  return boards.map(Board.toResponse)
}

module.exports = {
  create,
  getAll,
}
