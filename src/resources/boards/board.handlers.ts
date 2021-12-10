import { FastifyReply, FastifyRequest } from "fastify";
import * as boardService from './board.service'
import { IBoard } from "../../contract/resources/board.contract";

type RequestByBoardId = FastifyRequest<{
  Params: { boardId: string }
}>

type RequestWithBoard = FastifyRequest<{
  Body: IBoard,
}>

async function getAllBoards() {
  return boardService.getAll()
}

async function getBoard(req: RequestByBoardId, reply: FastifyReply) {
  const { boardId } = req.params

  const board = await boardService.getById(boardId)

  return board || reply.callNotFound()
}

async function createBoard(req: RequestWithBoard, reply: FastifyReply) {

  const board = await boardService.create(req.body)

  reply.code(201)

  return board
}

async function removeBoard(req: RequestByBoardId, reply: FastifyReply) {
  const { boardId } = req.params
  await boardService.removeById(boardId)
  reply.code(204)
}

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