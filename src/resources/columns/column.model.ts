import { v4 as uuid } from 'uuid'
import { IColumn } from "../../contract/resources/column.contract";
import { IModel } from "../../contract/model.contract";

/**
 * Column model
 */
export class Column implements IColumn, IModel<IColumn> {
  id: string

  title: string

  order: number

  constructor({
    id = uuid(),
    title = 'Column',
    order = 0,
  }) {
    this.id = id
    this.title = title
    this.order = order
  }

  /**
   * Get a value o the "id" property from the Column instance
   *
   * @param column - column instance
   * @returns - passed column id
   */
  static getId(column: Column) {
    return column.id
  }

  /**
   * Get a column that can be stored safely from this instance
   *
   * @returns - safely column
   */
  toStorage(): IColumn {
    return Column.toStorage(this)
  }

  /**
   * Get a column that can be sended safely from this instance
   *
   * @returns - safely column
   */
  toResponse(): IColumn {
    return Column.toResponse(this)
  }

  /**
   * Get a column that can be stored safely from passed instance
   *
   * @returns - safely column
   */
  static toStorage(column: Column): IColumn {
    const { id, title, order } = column
    return { id, title, order }
  }

  /**
   * Get a column that can be sended safely from passed instance
   *
   * @returns - safely column
   */
  static toResponse(column: Column): IColumn {
    const { id, title, order } = column
    return { id, title, order }
  }

  /**
   * Get a new instance f the Column class
   *
   * @param columnLike - initial column to create from
   * @returns - new Column instance
   */
  static create(columnLike: IColumn) {
    return new Column(columnLike)
  }
}
