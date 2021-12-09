import { MemoryRepository } from '../../common/memory-repository'
import { IColumnToStore } from '../../contract/resources/column.contract'

export const columnRepository = MemoryRepository.create<IColumnToStore>()