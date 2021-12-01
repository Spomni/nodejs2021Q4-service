function byStrictEqual(target) {
  return (item) => item === target
}

class MemoryRepository {

  constructor() {
    this._collection = []
  }
  
  add(...items) {
    this._collection.push(...items)
  }
  
  get(condition) {
    return this._collection.filter(condition)
  }
  
  getOnce(condition) {
    return this._collection.find(condition)
  }
  
  getAll() {
    return [...this._collection]
  }
  
  remove(condition) {
    const toRemoveList = this.get(condition)
    
    toRemoveList.forEach((toRemove) => {
      const index = this._collection.findIndex(byStrictEqual(toRemove))
      this._collection.splice(index, 1)
    })
  }
  
  static create() {
    return new MemoryRepository()
  }
}

module.exports = MemoryRepository
