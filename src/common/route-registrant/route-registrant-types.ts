import type {
  HTTPMethods,
  RouteHandler,
  FastifyPlugin,
  FastifyPluginOptions,
} from 'fastify'

export type RouteMethods = HTTPMethods | 'all' | 'ALL' | 'delete' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'options'

export interface RouteConfig {
  method: RouteMethods | RouteMethods[],
  path: string,
  handler: RouteHandler,
}

export interface PluginConfig {
  plugin: FastifyPlugin,
  options: FastifyPluginOptions,
}

/**
 * Check if the passed value implements RouteConfig interface
 *
 * @param value - value to check
 * @returns result of the checking
 */
export function isRouteConfig(value: unknown): value is RouteConfig {
  return typeof value === 'object'
    && value !== null
    && 'method' in value
}

/**
 * Check if the passed value implements PluginConfig interface
 *
 * @param value - value to check
 * @returns result of the checking
 */
export function isPluginConfig(value: unknown): value is PluginConfig {
  return typeof value === 'object'
    && value !== null
    && 'plugin' in value
}

/**
 * Check if the passed value is an array
 *
 * @param value - value to check
 * @returns result of the checking
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}