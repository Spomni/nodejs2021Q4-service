const { isArray } = Array

const collection = []

function add(column) {
  const list = (isArray(column)) ? column : [column]
  collection.push(...list)
}

function getOnce(condition) {
  return collection.find(condition)
}

function get(condition) {
  return collection.filter((item) => !condition(item))
}

module.exports = {
  add,
  getOnce,
  get,
}
