import Base from './Controllers/BaseController'
import Repository from './Repositories/ProductRepository'
import Manager from './Managers/ProductManager'

class ProductController extends Base
{
    constructor(Repository , Manager)
    {
        super(Repository , Manager)

    }
}

export default new ProductController(Repository , Manager)
