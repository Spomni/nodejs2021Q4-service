const path = require('path');

const Fastify = require('fastify')
const fastifySwagger = require('fastify-swagger')
const userRouter = require('./resources/users/user.router');

const swaggerOptions = {
  mode: 'static',
  exposeRoute: true,
  routePrefix: '/doc',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
}

async function createApp() {
  
  const app = Fastify()

  await app.register(fastifySwagger, swaggerOptions)
  
  app.all('/', () => 'Service is running!')

  await app.register(userRouter, { prefix: '/users' })
  
  return app
}

module.exports = {
  createApp,
}
