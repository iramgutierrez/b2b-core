import Base from './Validators/BaseValidator'
import validate from 'mongoose-validator';

class ProductValidator extends Base
{
  constructor(Entity){
    super(Entity)

    this.entity.schema.path('sku').required(true);
    this.entity.schema.path('name').required(true);
    this.entity.schema.path('descriptions.short').required(true);
    this.entity.schema.path('descriptions.long').required(true);
    this.entity.schema.path('details').schema.path('name').required(true);
    this.entity.schema.path('details').schema.path('value').required(true);
    this.entity.schema.path('shipping_details.weight').required(true);
    this.entity.schema.path('shipping_details.width').required(true);
    this.entity.schema.path('shipping_details.height').required(true);
    this.entity.schema.path('shipping_details.depth').required(true);
    this.entity.schema.path('stock.quantity').required(true);
    this.entity.schema.path('prices').schema.path('type').required(true);
    this.entity.schema.path('prices').schema.path('value').required(true);
    this.entity.schema.path('current_price').required(true);
    this.entity.schema.path('categories').schema.path('name').required(true);
    this.entity.schema.path('created_at').required(true);
    this.entity.schema.path('updated_at').required(true);

    this.entity.schema.path('name').validate(validate({
      validator: 'isLength',
      arguments: [3, 50],
      //message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }));

    this.entity.schema.path('prices').validate(function(prices){
      if(!prices){return false}
      else if(prices.length === 0){return false}
      return true;
    }, 'Product needs to have at least one price')

  }
}

export default ProductValidator
