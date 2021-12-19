import { FastifyReply, FastifyRequest } from "fastify";
import * as boardService from './board.service'
import { IBoard } from "../../contract/resources/board.contract";

type RequestByBoardId = FastifyRequest<{
  Params: { boardId: string }
}>

type RequestWithBoard = FastifyRequest<{
  Body: IBoard,
}>

/**
 * Handle request to get all stored boards
 *
 * @returns all stored boards
 */
async function getAllBoards() {
  return boardService.getAll()
}

/**
 * Handle request to get a board
 *
 * @param req - request to get board
 * @param reply - fastify reply object
 *
 * @returns board or nothing if it is not found
 */
async function getBoard(req: RequestByBoardId, reply: FastifyReply) {
  const { boardId } = req.params

  const board = await boardService.getById(boardId)

  return board || reply.callNotFound()
}

/**
 * Handle request to create a new board
 *
 * @param req - request to create a board
 * @param reply - fastify reply object
 *
 * @returns created board
 */
async function createBoard(req: RequestWithBoard, reply: FastifyReply) {

  const board = await boardService.create(req.body)

  reply.code(201)

  return board
}

/**
 * Handle request to remove a board
 *
 * @param req - request to remove a board
 * @param reply - fastify reply object
 */
async function removeBoard(req: RequestByBoardId, reply: FastifyReply) {
  const { boardId } = req.params
  await boardService.removeById(boardId)
  reply.code(204)
}

/**
 * Handle request to update a board
 *
 * @param req - request to update a board
 *
 * @returns updated board
 */
async function updateBoard(req: RequestByBoardId & RequestWithBoard) {
  const { boardId } = req.params
  const board = await boardService.updateById(boardId, req.body)
  return board
}

export {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
}