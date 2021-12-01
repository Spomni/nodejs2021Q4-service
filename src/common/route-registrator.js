const { isArray } = Array

class RouteRegistrator {

  constructor(fastify) {
    this._fastify = fastify
  }
  
  register(route) {
    const routeList = (isArray(route)) ? route : [route]
    this._registerRouteList(routeList)
  }
  
  _registerRouteList(routeList) {
    routeList.forEach((route) => {
      
      const opts = {
        ...route,
        method: route.method.toUpperCase()
      }
      
      this._fastify.route(opts)
    })
  }
  
  static create(fastify) {
    return new RouteRegistrator(fastify)
  }
}

module.exports = RouteRegistrator
