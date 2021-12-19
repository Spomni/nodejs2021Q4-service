import { Board } from './board.model'
import { boardRepository as boardRepo } from './board.memory.repository'
import * as columnService from '../columns/column.service'
import * as taskService from '../tasks/task.service'
import { IBoard } from '../../contract/resources/board.contract'

import {
  wakeUpBoard,
  byId,
  storeBoard,
} from './board.service.helpers'

/**
 * Get all stored boards
 *
 * @returns an array of boards
 */
async function getAll() {

  const storedList = await boardRepo.getAll()

  const boards = await Promise.all(
    storedList.map(wakeUpBoard)
  )

  return boards.map(Board.toResponse)
}

/**
 * Get a board with passed id
 *
 * @param boardId - board id
 * @returns board or null if the board is not found
 */
async function getById(boardId: string) {
  const stored = await boardRepo.getOnce(byId(boardId))

  if (!stored) return null

  const board = await wakeUpBoard(stored)
  return board.toResponse()
}

/**
 * Create and store a new board
 *
 * @param boardLike - data to create board
 * @returns created board
 */
async function create(boardLike: IBoard) {
  const board = Board.create(boardLike)

  await storeBoard(board)

  return getById(board.id)
}

/**
 * remove a board with passed id
 *
 * @param boardId - board id
 */
async function removeById(boardId: string) {

  await Promise.all([
    boardRepo.remove(byId(boardId)),
    columnService.removeByBoardId(boardId),
    taskService.removeByBoardId(boardId)
  ])
}

/**
 * Update a stored board
 *
 * @param boardId - board id
 * @param toUpdate - an object to update a board
 * @returns updated board
 */
async function updateById(boardId: string, toUpdate: IBoard) {

  await removeById(boardId)

  await storeBoard(Board.create(toUpdate))

  return getById(boardId)
}

export {
  create,
  getAll,
  getById,
  removeById,
  updateById,
}