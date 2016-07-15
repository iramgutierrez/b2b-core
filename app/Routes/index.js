import app from './app'
import products from './Routes/products'
import IoC from './IoC'
var HomeController = IoC.create('HomeController')

class Routes {
    constructor(app)
    {
        this.app = app
    }
    initialize()
    {
        app.get('/', (req,res) => HomeController.index(req,res))
        app.use('/products', products)
    }
}

export default new Routes(app)
