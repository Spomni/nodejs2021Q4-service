import { IModel } from '../model.contract'

export interface ITask {
  id?: string,
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string | null,
  columnId: string | null
}

export interface ITaskToStore {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string | null,
  columnId: string | null
}

export type ITaskToSend = ITaskToStore

export type ITaskModel = IModel<ITaskToStore, ITaskToSend>