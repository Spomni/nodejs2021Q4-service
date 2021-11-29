const User = require('./user.model');
const usersService = require('./user.service');

async function userRouter(fastify) {
  
  fastify.get('/', async (req, reply) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    return users.map(User.toResponse)
  })
}

module.exports = userRouter
