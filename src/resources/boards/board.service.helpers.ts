import { Board } from './board.model'
import { boardRepository as boardRepo } from './board.memory.repository'
import * as columnService from '../columns/column.service'
import { IBoardToStore } from '../../contract/resources/board.contract'

async function wakeUpBoard(stored: IBoardToStore) {
  const columns = await columnService.getByBoardId(stored.id)
  return Board.create({ ...stored, columns })
}

function byId(boardId: string) {
  return ({ id }: IBoardToStore) => id === boardId
}

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