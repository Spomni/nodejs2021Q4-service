import type {
  FastifyInstance,
  HTTPMethods,
} from 'fastify'

import {
  RouteConfig,
  PluginConfig,
  RouteMethods,

  isArray,
  isRouteConfig,
  isPluginConfig,
} from './route-registrant-types'


import { InvalidConfigError } from './route-registrant-errors'

/**
 * Tool to register fastify end points and routers in an uniform way
 */
export class RouteRegistrant {
  private _fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this._fastify = fastify
  }

  /**
   * Register routes and router plugins
   *
   * @param config - route config or an array of them
   */
  register(
    config: RouteConfig | PluginConfig | Array<RouteConfig | PluginConfig>
  ) {
    const configList = (isArray(config)) ? config : [config]
    this._registerConfigList(configList)
  }

  /**
   * Register routes and router plugins
   *
   * @param configList - array of routes and plugins configuration
   */
  private _registerConfigList(
    configList: Array<RouteConfig | PluginConfig>
  ) {
    configList.forEach((config) => {

      if (isRouteConfig(config)) {
        this._route(config)
        return
      }

      if (isPluginConfig(config)) {
        this._register(config)
        return
      }

      throw new InvalidConfigError(config)
    })
  }

  /**
   * Register a route
   *
   * @param config - route config
   */
  private _route(config: RouteConfig) {

    const { method } = config

    const methodList = (isArray(method)) ? method : [method]
      .map((name) => name.toUpperCase() as RouteMethods)

    if (methodList.includes('ALL')) {
      this._routeMethodAll(config)
    } else {
      this._fastify.route({
        ...config,
        method: methodList as HTTPMethods[],
        url: config.path,
      })
    }
  }

  /**
   * Register route with the method ALL
   *
   * @param config - route configuration
   */
  private _routeMethodAll(config: RouteConfig) {
    const {
      method,
      path,
      handler,
      ...options
    } = config

    this._fastify.all(path, options, handler)
  }

  /**
   * Register fastify router plugin
   *
   * @param config - plugin configuration
   */
  private _register(config: PluginConfig) {
    const { plugin, options } = config
    this._fastify.register(plugin, options)
  }

  static create(fastify: FastifyInstance) {
    return new RouteRegistrant(fastify)
  }
}
