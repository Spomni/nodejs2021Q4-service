const Column = require('./column.model')
const columnRepo = require('./column.memory.repository')

const { isArray } = Array

function createOnce(columnLike) {
  const column = new Column(columnLike)
  columnRepo.add(column.toStorage())
  return column.toResponse()
}

function create(columnLike) {
  if (!isArray(columnLike)) {
    return createOnce(columnLike)
  }

  return columnLike.map((current) => createOnce(current))
}

async function getByIdOnce(columnId) {
  return columnRepo.getOnce(({ id }) => id === columnId)
}

async function getByIdList(columnIdList) {
  return columnRepo.get(({ id }) => columnIdList.includes(id))
}

async function getById(id) {
  if (!isArray(id)) {
    return getByIdOnce(id)
  }
  return getByIdList(id)
}

function by(columnId) {
  return ({ id }) => id === columnId
}

function removeById(columnId) {
  columnRepo.remove(by(columnId))
}

module.exports = {
  create,
  getById,
  removeById,
}