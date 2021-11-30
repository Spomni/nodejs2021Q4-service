const boardService = require('./board.service')

async function boardRouter(fastify) {

  fastify.get('/', async () => boardService.getAll())
  
  fastify.get('/:boardId', async (req) => {
    const { boardId } = req.params
    return boardService.getById(boardId)
  })

  fastify.post('/', async (req, reply) => {
    reply.code(201)
    return boardService.create(req.body)
  })
  
  fastify.delete('/:boardId', async (req, reply) => {
    // this is a mock
    reply.code(204)
  })
}

module.exports = boardRouter
