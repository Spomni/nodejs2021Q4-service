function fromSrc(filename) {
  return global.testEnv.fromSrc(filename)
}

jest.mock('fastify', () => {
  return jest.fn(() => {
    return {
      route: jest.fn(),
      register: jest.fn(),
    }
  })
})

const Fastify = require('fastify')
const RouteRegistrator = require(fromSrc('common/route-registrator'))
const { create: createRegistrator } = RouteRegistrator

describe('route-registrator', () => {
  
  describe('RouteRegistrator', () => {
    
    describe('.create', () => {
      it('should return create a new RouterRegistrator instance', () => {
        const app = Fastify()
        
        const registrator = createRegistrator(app)
        
        expect(registrator).toBeInstanceOf(RouteRegistrator)
      })
    })
  })
})
