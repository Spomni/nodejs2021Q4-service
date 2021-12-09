import { Column } from './column.model'
import { IColumnToStore } from '../../contract/resources/column.contract'
import { columnRepository as columnRepo } from './column.memory.repository'
import * as taskService from "../tasks/task.service";

/**
 * Check if the passed value is an instance of Array
 *
 * @param value - value to check
 *
 * @returns Confirmation or not
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * Get an iterator callback to filter a column collection by id.
 *
 * Callback returns true if the current item's id strictly equals to the passed id
 *
 * @param columnId - if to equality
 *
 * @returns Confirmation or not
 */
function byColumnId(columnId: string) {
  return (item: IColumnToStore) => item.id === columnId
}

/**
 * Get an iterator callback to filter a column collection by id collection.
 *
 * Callback returns true if the current item's id is contained in the passed array od ids.
 *
 * @param idList - if to equality
 *
 * @returns Confirmation or not
 */
function byColumnIdList(columnIdList: string[]) {
  return (column: IColumnToStore) => columnIdList.includes(column.id)
}

function byBoardId(targetBoardId: string) {
  return ({ boardId }: IColumnToStore) => boardId === targetBoardId
}

/**
 * Get stored columns by id.
 *
 * @param columnId - uuid string or an array of they
 *
 * @returns column or array of columns if more than one columns are found
 */
async function getById(columnId: string | string[]) {
  return (isArray(columnId))
    ? columnRepo.get(byColumnIdList(columnId))
    : columnRepo.getOnce(byColumnId(columnId))
}

/**
 * Create and store one column
 *
 * @param columnLike - initial column to store
 *
 * @returns stored column
 */
async function createOnce(columnLike: IColumnToStore) {
  const column = new Column(columnLike)
  await columnRepo.add(column.toStorage())
  return getById(column.id)
}

/**
 * Create one or more columns
 *
 * @param columnLike - initial column to store or an array of they
 *
 * @returns stored column or an array of they
 */
async function create(columnLike: IColumnToStore | IColumnToStore[]) {
  return (!isArray(columnLike))
    ? createOnce(columnLike)
    : Promise.all(
        columnLike.map((current) => createOnce(current))
      )
}

/**
 * Remove stored column
 *
 * @param columnId - id to find column in storage
 */
async function removeById(columnId: string) {
  await Promise.all([
    columnRepo.remove(byColumnId(columnId)),
    taskService.removeByColumnId(columnId)
  ])
}

async function removeByBoardId(boardId: string) {
  await columnRepo.remove(byBoardId(boardId))
}

export {
  create,
  getById,
  removeById,
  removeByBoardId,
}
