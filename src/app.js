const path = require('path');
const userRouter = require('./resources/users/user.router');

const Fastify = require('fastify')
const expressPlugin = require('fastify-express')

const fastifySwagger = require('fastify-swagger')

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
  
  await app.register(expressPlugin)
  await app.register(fastifySwagger, swaggerOptions)
  
  app.all('/', () => 'Service is running!')

  app.use('/users', userRouter);
  
  return app
}

module.exports = {
  createApp,
}
