import { MemoryRepository } from "../../common/memory-repository";
import { IUserToStore } from "../../contract/resources/user.contract";

export const userRepository = MemoryRepository.create<IUserToStore>()