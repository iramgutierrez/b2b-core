import Base from './Managers/BaseManager'
import Entity from './Entities/ProductEntity'
import Validator from './Validators/ProductValidator'

class ProductManager extends Base
{
    constructor(Validator, Entity)
    {
        super(Validator, Entity)
    }
}

export default new ProductManager(Validator, Entity)
