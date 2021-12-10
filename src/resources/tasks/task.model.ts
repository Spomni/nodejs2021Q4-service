import { v4 as uuid } from 'uuid'
import {
  ITaskModel,
  ITask,
  ITaskToStore,
  ITaskToSend,
} from '../../contract/resources/task.contract'

export class Task implements ITaskModel {
  
  id: string

  title: string

  order: number

  description: string

  userId: string | null

  boardId: string | null

  columnId: string | null
  
  constructor({
    id = uuid(),
    title = 'Column',
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITask) {
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
  
  static toStorage(task: Task): ITaskToStore {
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
  
  static toResponse(task: Task): ITaskToSend {
    return Task.toStorage(task)
  }
  
  static create(task: ITask) {
    return new Task(task)
  }
}
