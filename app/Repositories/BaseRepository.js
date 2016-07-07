import Q from 'q'

export default class BaseRepository
{
  constructor(Entity)
  {
      this.entity = Entity
  }
  create()
  {
    return new this.entity
  }
  all()
  {
    return this.entity.find()
  }
  findById(id)
  {

    return this.entity.findById(id)
        .then(resource => {
          if(resource instanceof this.entity){ return Q.resolve(resource) }
          return Q.reject('Entity not found')
        })
        .catch(err => Q.reject(err))
  }
}
