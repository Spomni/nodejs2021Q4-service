const boardService = require('./board.service')

async function getAllBoards() {
  return boardService.getAll()
}

async function getBoard(req, reply)  {
  const { boardId } = req.params
  
  const board = await boardService.getById(boardId)
  
  return board || reply.callNotFound()
}

async function createBoard(req, reply) {

  const board = await boardService.create(req.body)
  
  reply.code(201)
  
  return board
}

async function deleteBoard(req, reply) {
  const { boardId } = req.params
  await boardService.removeById(boardId)
  reply.code(204)
}

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
}