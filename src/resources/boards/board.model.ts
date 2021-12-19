import { v4 as uuid } from "uuid"
import { Column } from '../columns/column.model'

import {
  IBoard,
  IBoardModel,
  IBoardToStore,
  IBoardToSend,
} from '../../contract/resources/board.contract'

/**
 * Model to represent a board
 */
export class Board implements IBoardModel {
  id: string

  title: string

  columns: Column[]

  /**
   * Construct a new Board instance
   *
   * @param boardlike - an object to construct a board
   */
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

  /**
   * Transform this instance to an object that can be stored
   *
   * @returns board to store
   */
  toStorage(): IBoardToStore {
    const { id, title } = this
    return { id, title }
  }

  /**
   * Transform this instance to an object that can be sended to user
   *
   * @returns board to send
   */
  toResponse() {
    return Board.toResponse(this)
  }

  /**
   * Transform passed board to object that can be sended to user
   *
   * @param board - board to transform
   *
   * @returns board to send
   */
  static toResponse(board: Board): IBoardToSend {
    const { id, title, columns } = board

    return {
      id,
      title,
      columns: columns.map(Column.toResponse)
    }
  }

  /**
   * Create a new Board instance
   *
   * @param board - an object to construct a board
   */
  static create(board: IBoard) {
    return new Board(board)
  }
}
