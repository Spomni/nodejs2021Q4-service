import { IModel } from "../model.contract";

export interface IColumnToCreate {
  id?: string
  title: string,
  order: number,
  boardId: string,
}

export interface IColumnToStore {
  id: string,
  title: string,
  order: number,
  boardId: string,
}

export interface IColumnToSend {
  id: string,
  title: string,
  order: number,
}

export interface IColumnModel extends IModel<IColumnToStore, IColumnToSend> {
  id: string,
  title: string,
  order: number,
  boardId: string,
}