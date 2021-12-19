import { v4 as uuid } from 'uuid'
import {
  IColumnModel,
  IColumnToCreate,
  IColumnToSend,
  IColumnToStore
} from "../../contract/resources/column.contract";

/**
 * Model to represent a board column
 */
export class Column implements IColumnModel {
  id: string

  title: string

  order: number

  boardId: string

  /**
   * Construct a new Column instance
   *
   * @param columnLike - an object to construct a column
   */
  constructor({
    id = uuid(),
    title = 'Column',
    order = 0,
    boardId,
  }: IColumnToCreate) {
    this.id = id
    this.title = title
    this.order = order
    this.boardId = boardId
  }

  /**
   * Get a value of the "id" property from the Column instance
   *
   * @param column - column instance
   * @returns passed column id
   */
  static getId(column: Column) {
    return column.id
  }

  /**
   * Get a column that can be stored safely from this instance
   *
   * @returns safely column
   */
  toStorage() {
    return Column.toStorage(this)
  }

  /**
   * Get a column that can be sended safely from this instance
   *
   * @returns safely column
   */
  toResponse() {
    return Column.toResponse(this)
  }

  /**
   * Get a column that can be stored safely from passed instance
   *
   * @returns safely column
   */
  static toStorage(column: Column): IColumnToStore {
    const { id, title, order, boardId } = column
    return { id, title, order, boardId }
  }

  /**
   * Get a column that can be sended safely from passed instance
   *
   * @returns safely column
   */
  static toResponse(column: Column): IColumnToSend {
    const { id, title, order } = column
    return { id, title, order }
  }

  /**
   * Get a new instance f the Column class
   *
   * @param columnLike - initial column to create from
   * @returns new Column instance
   */
  static create(columnLike: IColumnToCreate) {
    return new Column(columnLike)
  }
}
