const Column = require('./column.model')
const columnRepo = require('./column.memory.repository')

const { isArray } = Array

function createOnce(columnLike) {
  const column = new Column(columnLike)
  columnRepo.add(column.toStorage())
  return column.toResponse()
}

function create(columnLike) {
  if (isArray(columnLike)) {
    return createOnce(columnLike)
  }

  return columnLike.map((current) => createOnce(current))
}

module.exports = {
  create,
}