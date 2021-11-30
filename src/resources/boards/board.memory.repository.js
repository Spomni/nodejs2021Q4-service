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

module.exports = {
  add,
  getAll,
  getOnce,
}