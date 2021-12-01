const userRepo = require('./user.memory.repository');
const User = require('./user.model');

function byId(targetId) {
  return ({ id }) => id === targetId
}

async function getAll() {
  return userRepo.getAll()
}

async function getById(userId) {
  return userRepo.getOnce(byId(userId))
}

async function create(userLike) {
  const user = new User(userLike)
  await userRepo.add(user.toStorage())
  return getById(user.id)
}

async function updateById(userId, toUpdate) {
  const user = new User(toUpdate)
  
  await userRepo.remove(byId(userId))
  await userRepo.add(user.toStorage())
  
  return getById(user.id)
}

async function removeById(userId) {
  await userRepo.remove(byId(userId))
}

module.exports = {
  getAll,
  create,
  getById,
  removeById,
  updateById,
}
