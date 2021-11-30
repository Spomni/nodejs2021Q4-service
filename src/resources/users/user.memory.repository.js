const collection = []

module.exports = {
  getAll() { return [...collection] },
  add(value) { collection.push(value) },
  getOnce(condition) { return collection.find(condition)},
};