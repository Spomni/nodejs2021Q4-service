import type { IRepository, ConditionCallback } from '../contract/repository.contract'

function byStrictEqual<TItem>(target: TItem): ConditionCallback<TItem> {
  return (item: TItem): boolean => item === target
}

/**
 * Repository to store something in memory
 */
class MemoryRepository<TItem> implements IRepository<TItem> {
  _collection: TItem[] = []

  async add(...items: TItem[]) {
    this._collection.push(...items)
  }

  async get(condition: ConditionCallback<TItem>) {
    return this._collection.filter(condition)
  }

  async getOnce(condition: ConditionCallback<TItem>) {
    const entity = this._collection.find(condition)
    return entity || null
  }

  async getAll() {
    return [...this._collection]
  }

  async remove(condition: ConditionCallback<TItem>) {
    const toRemoveList = await this.get(condition)

    toRemoveList.forEach((toRemove) => {
      const index = this._collection.findIndex(byStrictEqual(toRemove))
      this._collection.splice(index, 1)
    })
  }

  static create<T>(): MemoryRepository<T> {
    return new MemoryRepository()
  }
}

export { MemoryRepository }