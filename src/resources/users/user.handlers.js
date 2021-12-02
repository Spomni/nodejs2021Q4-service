const usersService = require('./user.service');

async function getAllUsers() {
  return usersService.getAll()
}

async function getUser(req) {
  const { userId } = req.params
  return usersService.getById(userId)
}

async function createUser(req, reply) {
  const user = await usersService.create(req.body);
  reply.code(201)
  return user
}

async function updateUser(req) {
  const { userId } = req.params
  return usersService.updateById(userId, req.body)
}

async function removeUser(req, reply) {
  await usersService.removeById(req.params.userId)
  reply.code(204)
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
}
