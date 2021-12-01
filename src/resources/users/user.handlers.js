const User = require('./user.model');
const usersService = require('./user.service');

async function getAllUsers() {
  return usersService.getAll()
}

async function getUser(req) {
  const { userId } = req.params
  return await usersService.getById(userId)
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

async function deleteUser(req, reply) {
  await usersService.removeById(req.params.userId)
  reply.code(204)
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}
