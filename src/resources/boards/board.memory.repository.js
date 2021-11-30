const collection = []

function add(board) {
  collection.push(board)
}

function getAll() {
  return [...collection]
}

function getOnce(condition) {
  return collection.find(condition)
}

function remove(condition) {
  const index = collection.findIndex(condition)
  collection.splice(index, 1)
}

module.exports = {
  add,
  getAll,
  getOnce,
  remove,
}