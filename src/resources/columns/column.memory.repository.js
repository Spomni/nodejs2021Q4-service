const { isArray } = Array

const collection = []

function add(column) {
  const list = (isArray(column)) ? column : [column]
  collection.push(...list)
}

module.exports = {
  add,
}