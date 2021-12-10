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

async function getAll() {

  const storedList = await boardRepo.getAll()

  const boards = await Promise.all(
    storedList.map(wakeUpBoard)
  )

  return boards.map(Board.toResponse)
}

async function getById(boardId: string) {
  const stored = await boardRepo.getOnce(byId(boardId))

  if (!stored) return null

  const board = await wakeUpBoard(stored)
  return board.toResponse()
}

async function create(boardLike: IBoard) {
  const board = Board.create(boardLike)

  await storeBoard(board)

  return getById(board.id)
}

async function removeById(boardId: string) {

  await Promise.all([
    boardRepo.remove(byId(boardId)),
    columnService.removeByBoardId(boardId),
    taskService.removeByBoardId(boardId)
  ])
}

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