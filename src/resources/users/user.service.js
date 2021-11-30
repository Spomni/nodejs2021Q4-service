const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

function getById(userId) {
  return usersRepo.getOnce(({ id }) => id === userId)
}

function create(userLike) {
  const user = new User(userLike)
  usersRepo.add(user.toStorage())
  return getById(user.id)
}

function removeById(userId) {
  usersRepo.removeOnce(({ id }) => id === userId)
}

module.exports = {
  getAll: usersRepo.getAll,
  create,
  getById,
  removeById,
};
