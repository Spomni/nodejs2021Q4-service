import { MemoryRepository } from '../../common/memory-repository'
import { ColumnLike } from './column.model'

export const columnRepository = MemoryRepository.create<ColumnLike>()