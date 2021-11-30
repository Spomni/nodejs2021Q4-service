const { v4: uuid } = require('uuid')
const Column = require('../columns/column.model')

class Board {

  constructor({
    id = uuid(),
    title = 'Board',
    columns = []
  }) {
    this.id = id
    this.title = title
    this.columns = columns.map(Column.create)
  }

  toStorage() {
    const { id, title, columns } = this

    return [
      { id, title, columns: columns.map(Column.getId) },
      columns.map(Column.toStorage)
    ]
  }
  
  toResponse() {
    const { id, title, columns } = this
    
    return {
      id,
      title,
      columns: columns.map(Column.toResponse)
    }
  }
}

module.exports = Board
