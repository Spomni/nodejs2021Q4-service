import { MemoryRepository } from '../../common/memory-repository'
import { IColumn } from '../../contract/resources/column.contract'

export const columnRepository = MemoryRepository.create<IColumn>()