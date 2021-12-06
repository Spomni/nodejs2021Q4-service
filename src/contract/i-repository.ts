export type ConditionCallback = (
  item: unknown,
  index: number,
  array: unknown[]
) => boolean

export interface IRepository {
  get(condition: ConditionCallback): Promise<unknown[]>,
  getAll(): Promise<unknown[]>,
  getOnce(condition: ConditionCallback): Promise<unknown | null>,
  add(...args: unknown[]): Promise<void>,
  remove(condition: ConditionCallback): Promise<void>,
}