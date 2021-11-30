const User = require('./user.model');
const usersService = require('./user.service');

async function userRouter(fastify) {
  
  fastify.get('/', async () => {
    const users = await usersService.getAll();
    return users.map(User.toResponse)
  })
  
  fastify.post('/', async (req, reply) => {
    const user = await usersService.create(req.body);
    reply.code(201)
    return User.toResponse(user)
  })
  
  fastify.delete('/:userId', async (req, reply) => {
    await usersService.removeById(req.params.userId)
    reply.code(204)
  })
}

module.exports = userRouter