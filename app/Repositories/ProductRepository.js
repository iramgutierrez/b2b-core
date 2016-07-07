import Base from './Repositories/BaseRepository'
import Entity from './Entities/ProductEntity'
import Q from 'q'


class ProductRepository extends Base
{
    constructor(Entity)
    {

        super(Entity)

    }
}

export default new ProductRepository(Entity)
