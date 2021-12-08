export interface IConditionCallback<TItem> {
  (item: TItem): boolean
}

export interface IRepository<TItem> {
  get(condition: IConditionCallback<TItem>): Promise<TItem[]>,
  getAll(): Promise<TItem[]>,
  getOnce(condition: IConditionCallback<TItem>): Promise<TItem | null>,
  add(...args: TItem[]): Promise<void>,
  remove(condition: IConditionCallback<TItem>): Promise<void>,
}