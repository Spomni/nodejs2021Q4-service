const { create: RouteRegistrant } = require('../../common/route-registrant')

const {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require('./board.handlers')

const routeList = [
  {
    method: 'get',
    path: '/',
    handler: getAllBoards
  },
  {
    method: 'get',
    path: '/:boardId',
    handler: getBoard
  },
  {
    method: 'post',
    path: '/',
    handler: createBoard
  },
  {
    method: 'put',
    path: '/:boardId',
    handler: updateBoard
  },
  {
    method: 'delete',
    path: '/:boardId',
    handler: deleteBoard
  },
]

async function boardRouter(fastify) {
  RouteRegistrant(fastify)
    .register(routeList)
}

module.exports = boardRouter
