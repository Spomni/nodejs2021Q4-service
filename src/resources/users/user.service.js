const userRepo = require('./user.memory.repository');
const User = require('./user.model');

function byId(targetId) {
  return ({ id }) => id === targetId
}

async function getAll() {
  const storedList = await userRepo.getAll()
  return storedList.map(User.toResponse)
}

async function getById(userId) {
  const stored = await userRepo.getOnce(byId(userId))
  return User.toResponse(stored)
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
