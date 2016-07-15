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
        return this.entity.findOne({_id: id})
                .then(resource => {
                    if(resource instanceof this.entity){ return Q.resolve(resource) }
                    return Q.reject('Entity not found')
                })
                .catch(err => Q.reject(err))
    }
    findOneByName(name)
    {
        return this.entity.findOne({name:name})
                .then(resource => {
                    if(resource instanceof this.entity){ return Q.resolve(resource) }
                    return Q.reject('Entity not found')
                })
                .catch(err =>  Q.reject(err))
    }
}
