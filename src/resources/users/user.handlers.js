const User = require('./user.model');
const usersService = require('./user.service');

async function getAllUsers() {
  const users = await usersService.getAll();
  return users.map(User.toResponse)
}

async function getUser(req) {
  const { userId } = req.params
  const user = await usersService.getById(userId)
  return User.toResponse(user)
}

async function createUser(req, reply) {
  const user = await usersService.create(req.body);
  reply.code(201)
  return User.toResponse(user)
}

async function updateUser(req) {
  const { userId } = req.params
  const user = await usersService.updateById(userId, req.body)
  return User.toResponse(user)
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
