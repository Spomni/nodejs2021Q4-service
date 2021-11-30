const boardService = require('./board.service')

async function boardRouter(fastify) {

  fastify.get('/', async () => boardService.getAll())
  
  fastify.get('/:boardId', async (req, reply) => {
    const board = await boardService.getById(req.params.boardId)
    return board || reply.callNotFound()
  })

  fastify.post('/', async (req, reply) => {
    reply.code(201)
    const board = boardService.create(req.body)
    return board
  })
  
  fastify.delete('/:boardId', async (req, reply) => {
    const { boardId } = req.params
    await boardService.removeById(boardId)
    reply.code(204)
  })
}

module.exports = boardRouter
