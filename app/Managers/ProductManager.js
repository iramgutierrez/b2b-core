import Base from './Managers/BaseManager';
import moment from 'moment';

class ProductManager extends Base
{
    constructor(Validator, Entity)
    {
        super(Validator, Entity)
    }

    prepareData(data)
    {
        let now = moment();
        if(!this.entity.hasOwnProperty('_id')){
            data.created_at = now;
        }
        data.updated_at = now;
        return data;
    }
}

export default ProductManager
