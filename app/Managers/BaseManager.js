import Q from 'q'

export default class BaseManager
{
    constructor(Validator, Entity){
      this.validator = Validator
      this.entity = Entity
    }

    save(data)
    {
        var fillable = this.entity.getFillable()

        fillable.forEach(field => {
          if(data.hasOwnProperty(field))
          {
            this.entity[field] = data[field]
          }
        })

        this.validator.setEntity(this.entity)

        return this.validator
            .isValid()
            .then(valid => {
                this.entity.save()
                return this.entity
            })
            .catch(err => Q.reject(this.validator.errors))
    }

    update(data)
    {
        return this.save(data)
    }

    delete()
    {
      return this.entity.remove()
                        .then(resource => Q.resolve(true))
    }

    setEntity(Entity)
    {
        this.entity = Entity
    }
}
