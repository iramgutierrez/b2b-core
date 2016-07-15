import Q from 'q'

export default class BaseValidator
{
  constructor(Entity){
    this.entity = Entity
  }

  isValid()
  {
    return this.entity.validate( error => {
      if(error)
      {
        this.errors = this._generateErrors(error)
        return Q.reject()
      }
      else{ return Q.resolve() }

    })
  }

  setEntity(Entity)
  {
      this.entity = Entity
  }

  _generateErrors(err)
  {
      err = err.errors

      var errors = {}

      Object.keys(err).forEach(function (e) {
        let error = err[e];
        errors[e] = error.message
      })

      return errors
  }

}
