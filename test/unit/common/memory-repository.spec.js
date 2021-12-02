const { fromSrc } = global.testEnv

const MemoryRepository = require(fromSrc('common/memory-repository'))
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
      it('should add all passed values to the repo', () => {
        const entities = ['one', 'two', 'three']
        const repo = createRepo()
        
        repo.add(...entities)
        
        expect(repo.getAll()).toEqual(entities)
      })
    })
    
    describe('#getAll()', () => {
      it('should return an array with all entities stored in repo', () => {
        const entities = ['one', 'two', 'three']
        const repo = createRepo()
        
        repo.add(...entities)
        
        expect(repo.getAll()).toEqual(entities)
      })
    })
    
    describe('#get()', () => {

      it('should return an array with all entities that match to passed condition', () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', toFind, 'two', 'three', toFind]
 
        const repo = createRepo()
        repo.add(...entities)
        
        expect(repo.get(condition)).toEqual([toFind, toFind])
      })

      it('should return an empty array if entities are not found', () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', 'two', 'three']
         
        const repo = createRepo()
        repo.add(...entities)
        
        expect(repo.get(condition)).toEqual([])
      })
    })
    
    describe('#getOnce()', () => {
    
      it('should return one entity that match to passed condition', () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', toFind, 'two', 'three', toFind]
         
        const repo = createRepo()
        repo.add(...entities)
        
        expect(repo.getOnce(condition)).toEqual(toFind)
      })
      
      it('should return null if entity is not found', () => {
        const toFind = {}
        const condition = (entity) => entity === toFind
        const entities = ['one', 'two', 'three']
         
        const repo = createRepo()
        repo.add(...entities)
        
        expect(repo.getOnce(condition)).toEqual(null)
      })
    })
    
    describe('#remove()', () => {
    
      it('should remove all entities that match to passed condition', () => {

        const toFind = {}
        const condition = (entity) => entity === toFind
        const notCondition = (entity) => !condition(entity)
        const entities = ['one', toFind, 'two', 'three', toFind]
         
        const repo = createRepo()
        repo.add(...entities)
        repo.remove(condition)
        
        expect(repo.getAll()).toEqual(entities.filter(notCondition))
      })
    })
  })
})