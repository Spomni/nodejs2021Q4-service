const { fromSrc } = global.testEnv

const { MemoryRepository } = require(fromSrc('common/memory-repository'))
const { create: createRepo } = MemoryRepository

describe('memory-repository', () => {

  describe('MemoryRepository', () => {

    describe('.create', () => {
      it('should return new instance of MemoryRepository', () => {
        const repo = createRepo()
        expect(repo).toBeInstanceOf(MemoryRepository)
      })
    })

    describe('#add()', () => {
      it('should add all passed values to the repo', async () => {
        const entities = ['one', 'two', 'three']
        const repo = createRepo()

        await repo.add(...entities)

        expect(await repo.getAll()).toEqual(entities)
      })
    })

    describe('#getAll()', () => {
      it('should return an array with all entities stored in repo', async () => {
        const entities = ['one', 'two', 'three']
        const repo = createRepo()

        await repo.add(...entities)

        expect(await repo.getAll()).toEqual(entities)
      })
    })

    describe('#get()', () => {

      it('should return an array with all entities that match to passed condition', async () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', toFind, 'two', 'three', toFind]

        const repo = createRepo()
        await repo.add(...entities)

        expect(await repo.get(condition)).toEqual([toFind, toFind])
      })

      it('should return an empty array if entities are not found', async () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', 'two', 'three']

        const repo = createRepo()
        await repo.add(...entities)

        expect(await repo.get(condition)).toEqual([])
      })
    })

    describe('#getOnce()', () => {

      it('should return one entity that match to passed condition', async () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', toFind, 'two', 'three', toFind]

        const repo = createRepo()
        await repo.add(...entities)

        expect(await repo.getOnce(condition)).toEqual(toFind)
      })

      it('should return null if entity is not found', async () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', 'two', 'three']

        const repo = createRepo()
        await repo.add(...entities)

        expect(await repo.getOnce(condition)).toEqual(null)
      })
    })

    describe('#remove()', () => {

      it('should remove all entities that match to passed condition', async () => {

        const toFind = {}
        const condition = (entity) => entity === toFind
        const notCondition = (entity) => !condition(entity)
        const entities = ['one', toFind, 'two', 'three', toFind]

        const repo = createRepo()
        await repo.add(...entities)
        await repo.remove(condition)

        expect(await repo.getAll()).toEqual(entities.filter(notCondition))
      })
    })
  })
})