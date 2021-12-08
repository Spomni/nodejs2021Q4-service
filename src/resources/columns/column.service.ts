import { Column, ColumnLike } from './column.model'
import { columnRepository as columnRepo } from './column.memory.repository'
import type { IConditionCallback } from '../../contract/i-repository'

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

function byId(id: string) {
  return (column: ColumnLike): boolean => column.id === id
}

async function getByIdOnce(columnId: string) {
  return columnRepo.getOnce(
    byId(columnId)
  )
}

async function getByIdList(columnIdList: string[]) {
  return columnRepo.get(({ id }: ColumnLike): boolean => columnIdList.includes(id))
}

async function getById(id: string | string[]) {
  if (!isArray(id)) {
    return getByIdOnce(id)
  }
  return getByIdList(id)
}

function byColumnId(columnId: string) {
  return (item: ColumnLike) => item.id === columnId
}

async function createOnce(columnLike: ColumnLike) {
  const column = new Column(columnLike)
  await columnRepo.add(column.toStorage())
  return getByIdOnce(column.id)
}

async function create(
  columnLike: ColumnLike | ColumnLike[]
) {
  if (!isArray(columnLike)) {
    return createOnce(columnLike)
  }

  return Promise.all(
    columnLike.map((current) => createOnce(current))
  )
}

async function removeById(columnId: string) {
  columnRepo.remove(byColumnId(columnId))
}

export {
  create,
  getById,
  removeById,
}