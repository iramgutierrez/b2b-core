import mongoose from 'mongoose'
import loadClass from 'mongoose-class-wrapper';
import validate from 'mongoose-validator'
import uniqueValidator from 'mongoose-unique-validator'

let ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique: true,
        validate : [
            validate({
                validator: 'isLength',
                arguments: [3, 50],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    price: {
        type: Number,
        required : true
    }
},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})


class ProductEntity {

  getFillable()
  {
    return ['name' , 'price']
  }

}

ProductSchema.plugin(uniqueValidator)
ProductSchema.plugin(loadClass, ProductEntity)

export default mongoose.model('Product', ProductSchema)
