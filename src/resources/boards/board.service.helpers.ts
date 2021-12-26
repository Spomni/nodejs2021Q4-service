import { Board } from './board.model'
import { boardRepository as boardRepo } from './board.memory.repository'
import * as columnService from '../columns/column.service'
import { IBoardToStore } from '../../contract/resources/board.contract'

/**
 * Wake up a board model from the stored one
 *
 * @param stored - board from storage
 *
 * @returns board model
 */
async function wakeUpBoard(stored: IBoardToStore) {
  const columns = await columnService.getByBoardId(stored.id)
  return Board.create({ ...stored, columns })
}

/**
 * Create a function to check if the board has a passed id
 *
 * @param boardId - board id
 *
 * @returns function to check
 */
function byId(boardId: string) {
  return ({ id }: IBoardToStore) => id === boardId
}

/**
 * Store a board and dependencies of them
 *
 * @param board - board model
 */
async function storeBoard(board: Board) {
  await Promise.all([
    boardRepo.add(board.toStorage()),
    columnService.create(
      board.columns.map((col) => col.toStorage())
    )
  ])
}

export {
  wakeUpBoard,
  byId,
  storeBoard,
}