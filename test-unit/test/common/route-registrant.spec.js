function fromSrc(filename) {
  return global.testEnv.fromSrc(filename)
}

jest.mock('fastify', () => {
  return jest.fn(() => {
    return {
      route: jest.fn(),
      register: jest.fn(),
      all: jest.fn(),
    }
  })
})

const app = require('fastify')()
const { RouteRegistrant } = require(fromSrc('common/route-registrant'))
const { create: createRegistrant } = RouteRegistrant

describe('route-registrant', () => {

  beforeEach(() => jest.clearAllMocks())

  describe('RouteRegistrant', () => {

    describe('.create()', () => {
      it('should return create a new RouterRegistrant instance', () => {
        const registrant = createRegistrant(app)

        expect(registrant).toBeInstanceOf(RouteRegistrant)
      })
    })

    describe('#register()', () => {

      it('should add route by config', () => {
        const config = {
          method: 'GET'
        }

        createRegistrant(app).register(config)

        expect(app.route).toHaveBeenCalledWith({ method: [config.method]})
      });

      it('should transform route method to upper case', () => {
        const config = {
          method: 'post'
        }

        createRegistrant(app).register(config)

        expect(app.route).toHaveBeenCalledWith({
          method: [config.method.toUpperCase()]
        })
      });

      it('should support the routing method ALL', () => {
        const method = 'all'
        const path = '/some/path'
        const handler = () => {}
        const options = { prop: 'name' }

        const config = {
          ...options,
          method,
          path,
          handler,
        }

        createRegistrant(app).register(config)

        expect(app.all).toHaveBeenCalledWith(path, options, handler)
      })

      it('should add plugin by config', () => {
        const plugin = jest.fn()
        const options = {}
        const config = { plugin, options }

        createRegistrant(app).register(config)

        expect(app.register).toHaveBeenCalledWith(plugin, options)
      });

      it('should works correct with configList', () => {

        const configList = [
          {
            method: ['GET']
          },
          {
            plugin: () => {},
            options: {}
          },
          {
            method: ['POST']
          },
          {
            plugin: () => {},
            options: {}
          },
        ]

        createRegistrant(app).register(configList)

        configList.forEach((config, index) => {
          if (config.method) {
            expect(app.route).toHaveBeenCalledWith(config)
          }
          if (config.plugin) {
            const { plugin, options } = config
            expect(app.register).toHaveBeenCalledWith(plugin, options)
          }
        })
      });

      it('should throw an error if config is invalid', () => {
        const config = {}

        const callRegister = () => createRegistrant(app).register(config)

        expect(callRegister).toThrow(/invalid.+config/)
      });
    });
  })
})