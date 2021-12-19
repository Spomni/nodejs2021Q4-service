import type { IRepository, ConditionCallback } from '../contract/repository.contract'

function byStrictEqual<TItem>(target: TItem): ConditionCallback<TItem> {
  return (item: TItem): boolean => item === target
}

/**
 * Repository to store something in memory
 */
class MemoryRepository<TItem> implements IRepository<TItem> {
  _collection: TItem[] = []

  /**
   * Insert item into repository
   *
   * @param items - item to store
   */
  async add(...items: TItem[]) {
    this._collection.push(...items)
  }

  /**
   * Get items from repository by passed condition
   *
   * @param condition - a function to filter a repository items
   * @returns - an array of items
   */
  async get(condition: ConditionCallback<TItem>) {
    return this._collection.filter(condition)
  }

  /**
   * Get first item that match to passed condition
   *
   * @param condition - a function to filter a repository items
   * @returns - an that is found or null
   */
  async getOnce(condition: ConditionCallback<TItem>) {
    const entity = this._collection.find(condition)
    return entity || null
  }

  /**
   * Get all stored items from repository
   *
   * @returns all stored items
   */
  async getAll() {
    return [...this._collection]
  }

  /**
   * Remove all items thats match to the passed condition
   *
   * @param condition - a function to filter a repository items
   */
  async remove(condition: ConditionCallback<TItem>) {
    const toRemoveList = await this.get(condition)

    toRemoveList.forEach((toRemove) => {
      const index = this._collection.findIndex(byStrictEqual(toRemove))
      this._collection.splice(index, 1)
    })
  }

  /**
   * Create a new MemoryRepository instance
   *
   * @returns a new MemoryRepository instance
   */
  static create<T>(): MemoryRepository<T> {
    return new MemoryRepository()
  }
}

export { MemoryRepository }