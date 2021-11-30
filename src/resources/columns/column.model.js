const { v4: uuid } = require('uuid')

class Column {

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
  
  static create(columnLike) {
    return new Column(columnLike)
  }
  
  static getId(column) {
    return column.id
  }
  
  static toStorage(column) {
    const { id, title, order } = column
    return { id, title, order }
  }
  
  static toResponse(column) {
    const { id, title, order } = column
    return { id, title, order }
  }
}

module.exports = Column