import { v4 as uuid } from 'uuid'
import { IColumn } from "../../contract/resources/column.contract";
import { IModel } from "../../contract/model.contract";

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

  toStorage() {
    return Column.toStorage(this)
  }

  toResponse() {
    return Column.toResponse(this)
  }

  static create(columnLike: IColumn) {
    return new Column(columnLike)
  }

  static getId(column: Column) {
    return column.id
  }

  static toStorage(column: Column) {
    const { id, title, order } = column
    return { id, title, order }
  }

  static toResponse(column: Column) {
    const { id, title, order } = column
    return { id, title, order }
  }
}
