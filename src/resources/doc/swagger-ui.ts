import * as path from 'path'

import fastifySwagger from 'fastify-swagger'
import type { FastifyStaticSwaggerOptions } from 'fastify-swagger'
import type { FastifyInstance } from 'fastify'

const apiYamlPath = path.resolve(__dirname, '../../../doc/api.yaml')

/**
 * Get fastify-swagger options to expose static UI
 *
 * @param routePrefix - url where ui should be exposed
 * @param specPath - path to the OpenAPI specification file
 *
 * @returns - object of the fastify-swagger plugin options
 */
function exposeStatic(
  routePrefix: string, specPath: string
): FastifyStaticSwaggerOptions {
  return {
    routePrefix,
    mode: 'static',
    exposeRoute: true,
    specification: {
      path: specPath,
      baseDir: path.resolve(apiYamlPath, '../'),
    },
  };
}

/**
 * Plugin to register fastify-swagger ui
 *
 * @param fastify - fastify instance
 */
export async function swaggerUI(fastify: FastifyInstance) {
  await fastify.register(fastifySwagger, exposeStatic('/', apiYamlPath))
}
