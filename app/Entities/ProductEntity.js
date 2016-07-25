import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';
import ProductSchema from './Schemas/ProductSchema'

class ProductEntity {

    constructor()
    {
        return mongoose.model('Product', ProductSchema);
    }

  getFillable()
  {
    return [
        'sku',
        'name',
        'prices',
        'images',
        'details',
        'descriptions',
        'shipping_details',
        'stock',
        'current_price',
        'created_at',
        'updated_at'
    ];
  }

}

ProductSchema.plugin(loadClass, ProductEntity);

export default ProductEntity
