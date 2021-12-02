const { create: RouteRegistrant } = require('../../common/route-registrant')

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./user.handlers')

const routeList = [
  {
    method: 'get',
    path: '/',
    handler: getAllUsers,
  },
  {
    method: 'get',
    path: '/:userId',
    handler: getUser,
  },
  {
    method: 'post',
    path: '/',
    handler: createUser,
  },
  {
    method: 'put',
    path: '/:userId',
    handler: updateUser,
  },
  {
    method: 'delete',
    path: '/:userId',
    handler: deleteUser,
  },
]

async function userRouter(fastify) {
  RouteRegistrant(fastify)
    .register(routeList)
}

module.exports = userRouter
