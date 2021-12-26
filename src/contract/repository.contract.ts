export interface ConditionCallback<TItem> {
  (item: TItem): boolean
}

export interface IRepository<TItem> {
  get(condition: ConditionCallback<TItem>): Promise<TItem[]>,
  getAll(): Promise<TItem[]>,
  getOnce(condition: ConditionCallback<TItem>): Promise<TItem | null>,
  add(...args: TItem[]): Promise<void>,
  remove(condition: ConditionCallback<TItem>): Promise<void>,
}