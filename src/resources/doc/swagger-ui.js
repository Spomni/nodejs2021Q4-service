const path = require('path');
const fastifySwagger = require('fastify-swagger')

async function swaggerUI(fastify) {
  await fastify.register(fastifySwagger, {
    mode: 'static',
    exposeRoute: true,
    routePrefix: '/',
    specification: {
      path: path.resolve(__dirname, '../../../doc/api.yaml'),
    },
  })
}

module.exports = swaggerUI