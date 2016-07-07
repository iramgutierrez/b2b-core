import Base from './Validators/BaseValidator'
import Entity from './Entities/ProductEntity'

class ProductValidator extends Base
{
  constructor(Entity){
    super(Entity)
  }
}

export default new ProductValidator(Entity)
