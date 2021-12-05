const path = require('path');
const fastifySwagger = require('fastify-swagger')

const apiYamlPath = path.resolve(__dirname, '../../../doc/api.yaml')

function exposeStatic(routePrefix, specPath) {
  return {
    routePrefix,
    mode: 'static',
    exposeRoute: true,
    specification: {
      path: specPath,
    },
  };
}

async function swaggerUI(fastify) {
  await fastify.register(fastifySwagger, exposeStatic('/', apiYamlPath))
}

module.exports = swaggerUI