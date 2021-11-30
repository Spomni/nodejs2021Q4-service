const collection = []

function add(board) {
  collection.push(board)
}

function getAll() {
  return [...collection]
}

module.exports = {
  add,
  getAll,
}