import { ITaskToStore } from '../../contract/resources/task.contract'
import { MemoryRepository } from '../../common/memory-repository'

export const taskRepository = MemoryRepository.create<ITaskToStore>()
