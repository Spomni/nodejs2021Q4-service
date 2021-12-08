import { v4 as uuid } from 'uuid'
import { IResponsable } from '../../contract/responsable.contract'
import { IStorable } from '../../contract/storable.contract'

export interface ColumnLike {
  id?: string,
  title: string,
  order: number,
}

export class Column implements ColumnLike, IStorable, IResponsable {
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

  static create(columnLike: ColumnLike) {
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
