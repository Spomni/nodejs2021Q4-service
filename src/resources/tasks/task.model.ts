import { v4 as uuid } from 'uuid'
import {
  ITaskModel,
  ITask,
  ITaskToStore,
  ITaskToSend,
} from '../../contract/resources/task.contract'

/**
 * Model to represent a board
 */
export class Task implements ITaskModel {

  id: string

  title: string

  order: number

  description: string

  userId: string | null

  boardId: string | null

  columnId: string | null

  /**
   * Construct a new Task instance
   *
   * @param tasklike - an object to construct a board
   */
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

  /**
   * Transform this instance to an object that can be sended to user
   *
   * @returns task to send
   */
  toResponse() {
    return Task.toResponse(this)
  }

  /**
   * Transform this instance to an object that can be stored
   *
   * @returns task to store
   */
  toStorage() {
    return Task.toStorage(this)
  }

  /**
   * Transform passed task to object that can be stored
   *
   * @param task - task to transform
   *
   * @returns task to store
   */
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

  /**
   * Transform passed task to object that can be sended to user
   *
   * @param task - task to transform
   *
   * @returns task to send
   */
  static toResponse(task: Task): ITaskToSend {
    return Task.toStorage(task)
  }

  /**
   * Create a new Task instance
   *
   * @param task - an object to construct a task
   */
  static create(task: ITask) {
    return new Task(task)
  }
}
