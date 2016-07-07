import app from './app'
import products from './Routes/products'

class Routes {
    constructor(app)
    {
        this.app = app
    }
    initialize()
    {
        app.use('/products', products)
    }
}

export default new Routes(app)
