const { create: RouteRegistrator } = require('../../common/route-registrator')

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
  RouteRegistrator(fastify)
    .register(routeList)
}

module.exports = userRouter
