const { isArray } = Array
const isRouteConfig = ({ method }) => Boolean(method)
const isPluginConfig = ({ plugin }) => Boolean(plugin)

class InvalidConfigError extends Error {
  constructor(config) {
    super(`invalid route config was found: ${config}`)
  }
}

class RouteRegistrator {

  constructor(fastify) {
    this._fastify = fastify
  }
  
  register(config) {
    const configList = (isArray(config)) ? config : [config]
    this._registerConfigList(configList)
  }
  
  _registerConfigList(configList) {
    configList.forEach((config) => {
    
      if (isRouteConfig) {
        this._route(config)
        return
      }
      
      if (isPluginConfig) {
        this._register(config)
        return
      }
      
      throw new InvalidConfigError(config)
    })
  }
  
  _route(config) {
    const options = {
      ...config,
      method: config.method.toUpperCase()
    }
    this._fastify.route(options)
  }

  _register({ plugin, options }) {
    this._fastify.register(plugin, options)
  }

  static create(fastify) {
    return new RouteRegistrator(fastify)
  }
}

module.exports = RouteRegistrator