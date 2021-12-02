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
const RouteRegistrant = require(fromSrc('common/route-registrant'))
const { create: createRegistrant } = RouteRegistrant

describe('route-registrant', () => {

  describe('RouteRegistrant', () => {

    describe('.create', () => {
      it('should return create a new RouterRegistrant instance', () => {
        const app = Fastify()

        const registrant = createRegistrant(app)

        expect(registrant).toBeInstanceOf(RouteRegistrant)
      })
    })
  })
})
