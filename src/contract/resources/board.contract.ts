import { IModel } from "../model.contract";
import {
  IColumn,
  IColumnToSend,
  IColumnModel,
} from "./column.contract"

export interface IBoard {
  id?: string
  title: string,
  columns: IColumn[]
}

export interface IBoardToStore {
  id: string,
  title: string,
}

export interface IBoardToSend {
  id: string,
  title: string,
  columns: IColumnToSend[]
}

export interface IBoardModel extends IModel<IBoardToStore, IBoardToSend> {
  id: string,
  title: string,
  columns: IColumnModel[]
}