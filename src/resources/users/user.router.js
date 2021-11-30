const User = require('./user.model');
const usersService = require('./user.service');

async function userRouter(fastify) {
  
  fastify.get('/', async () => {
    const users = await usersService.getAll();
    return users.map(User.toResponse)
  })
  
  fastify.post('/', async (req, res) => {
    const user = await usersService.create(req.body);
    res.code(201)
    return User.toResponse(user)
  })
}

module.exports = userRouter