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
    return Board.toResponse(this)
  }
  
  static toResponse(board) {
    const { id, title, columns } = board
    
    return {
      id,
      title,
      columns: columns.map(Column.toResponse)
    }
  }
}

module.exports = Board
