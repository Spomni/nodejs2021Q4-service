const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

function getAll() {
  return usersRepo.getAll()
}

function getById(userId) {
  return usersRepo.getOnce(({ id }) => id === userId)
}

function create(userLike) {
  const user = new User(userLike)
  usersRepo.add(user.toStorage())
  return getById(user.id)
}

function updateById(userId, updateWith) {
  const user = getById(userId)
  Object.assign(user, updateWith)
  return user
}

function removeById(userId) {
  usersRepo.remove(({ id }) => id === userId)
}

module.exports = {
  getAll,
  create,
  getById,
  removeById,
  updateById,
}
