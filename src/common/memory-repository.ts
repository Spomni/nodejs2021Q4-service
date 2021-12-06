import type { IRepository, ConditionCallback } from '../contract/i-repository'

function byStrictEqual(target: unknown): ConditionCallback {
  return (item: unknown): boolean => item === target
}

/**
 * Repository to store something in memory
 */
class MemoryRepository implements IRepository {
  _collection: unknown[] = []
  
  async add(...items: unknown[]): Promise<void> {
    this._collection.push(...items)
  }
  
  async get(condition: ConditionCallback): Promise<unknown[]> {
    return this._collection.filter(condition)
  }
  
  async getOnce(condition: ConditionCallback): Promise<unknown | null> {
    const entity = this._collection.find(condition)
    return entity || null
  }
  
  async getAll(): Promise<unknown[]> {
    return [...this._collection]
  }
  
  async remove(condition: ConditionCallback): Promise<void> {
    const toRemoveList = await this.get(condition)
    
    toRemoveList.forEach((toRemove) => {
      const index = this._collection.findIndex(byStrictEqual(toRemove))
      this._collection.splice(index, 1)
    })
  }
  
  static create(): MemoryRepository {
    return new MemoryRepository()
  }
}

export { MemoryRepository }