const boardService = require('./board.service')

async function boardRouter(fastify) {

  fastify.post('/', async (req, reply) => {
    const board = await boardService.create(req.body)
    reply.code(201)
    return board
  })
  
  fastify.delete('/:boardId', async (req, reply) => {
    // this a mock
    reply.code(204)
  })
}

module.exports = boardRouter
