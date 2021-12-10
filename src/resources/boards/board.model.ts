import { v4 as uuid } from "uuid"
import { Column } from '../columns/column.model'

import {
  IBoard,
  IBoardModel,
  IBoardToStore,
  IBoardToSend,
} from '../../contract/resources/board.contract'

export class Board implements IBoardModel {
  id: string

  title: string

  columns: Column[]

  constructor({
    id = uuid(),
    title = 'Board',
    columns = []
  }: IBoard) {
    this.id = id
    this.title = title
    this.columns = columns.map(
      (columnLike) => Column.create({ ...columnLike, boardId: id })
    )
  }

  toStorage(): IBoardToStore {
    const { id, title } = this
    return { id, title }
  }

  toResponse() {
    return Board.toResponse(this)
  }

  static toResponse(board: Board): IBoardToSend {
    const { id, title, columns } = board

    return {
      id,
      title,
      columns: columns.map(Column.toResponse)
    }
  }
  
  static create(board: IBoard) {
    return new Board(board)
  }
}
