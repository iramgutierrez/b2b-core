import BaseController from './Controllers/BaseController'
import bodyParser from 'body-parser'

var urlencodedParser = bodyParser.urlencoded({ extended: true })

class RouteResource
{
    create(router , controller)
    {
        this.router = router
        this.controller = controller

        if(controller instanceof BaseController === true)
        {
            router.get('/', (req , res) => controller.index(req , res) )
            router.post('/', urlencodedParser , (req , res) => controller.store(req , res) )
            router.get('/:id', (req , res) => controller.show(req , res) )
            router.put('/:id', urlencodedParser , (req , res) => controller.update(req , res) )
            router.delete('/:id', (req , res) => controller.delete(req , res) )
        }
        else
        {
            console.log('Controller tiene que ser una instacia de BaseController.')
        }

        return this.router
    }
}

export default RouteResource
