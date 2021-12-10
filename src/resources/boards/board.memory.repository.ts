import { MemoryRepository } from '../../common/memory-repository'
import { IBoardToStore } from '../../contract/resources/board.contract'

export const boardRepository = MemoryRepository.create<IBoardToStore>()
