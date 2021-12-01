const { v4: uuid } = require('uuid')

class Task {
  constructor({
    id = uuid(),
    title = 'Column',
    order = 0,
    description = '',
    userId,
    boardId,
    columnId
  }) {
    this.id = id
    this.title = title
    this.order = order
    this.description = description
    this.userId = userId
    this.boardId = boardId
    this.columnId = columnId
  }
  
  toResponse() {
    return Task.toResponse(this)
  }
  
  toStorage() {
    return Task.toStorage(this)
  }
  
  static toStorage(task) {
    const {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    } = task
    
    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    }
  }
  
  static toResponse(task) {
    return Task.toStorage(task)
  }
}

module.exports = Task