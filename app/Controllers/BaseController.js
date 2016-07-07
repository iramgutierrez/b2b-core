import Q from 'q'

export default class BaseController
{
    constructor(Repository , Manager)
    {

        this.repository = Repository
        this.manager = Manager
    }

    index(req , res)
    {
        return this.repository.all()
            .then(resources => res.status(200).json(resources))
            .catch(err => res.status(500).json({ errors : err}))

    }

    store(req , res)
    {
        if(!req.body) return res.status(400).json(this.generateErrors('Missing data'))

        let data = req.body

        let resource = this.repository.create()
        this.manager.setEntity(resource)

        return this.manager.save(data)
            .then(resource => res.status(200).json(resource))
            .catch(err => res.status(400).json(this.generateErrors(err)))
    }

    show(req , res)
    {
        let id = req.params.id || false

        if(!id) return res.status(400).json(this.generateErrors('Missing parameter: id'))

        return this.repository.findById(id)
            .then(resource => res.status(200).json(resource))
            .catch(err => res.status(404).json(this.generateErrors('Entity not found')))

    }

    update(req , res)
    {

        let id = req.params.id || false

        if(!id) return res.status(400).json(this.generateErrors('Missing parameter: id'))

        if(!req.body) return res.status(400).json(this.generateErrors('Missing data'))

        let data = req.body

        return this.repository.findById(id)
          .then(resource => {
            this.manager.setEntity(resource)
            return this.manager.update(data)
          })
          .then(resource => res.status(200).json(resource))
          .catch(err => res.status(400).json(this.generateErrors(err)))

    }

    delete(req , res)
    {
        let id = req.params.id || false

        if(!id) return res.status(400).json(this.generateErrors('Missing parameter: id'))

        return this.repository.findById(id)
          .then(resource => {
            this.manager.setEntity(resource)
            return this.manager.delete()
          })
          .then(resource => res.sendStatus(204))
          .catch(err => res.status(400).json(this.generateErrors(err)))

    }

    generateErrors(err)
    {
      if(typeof err == 'string')
      {
        return { error : err}
      }
      return { errors : err}
    }
}
