import mongoose from 'mongoose';
import mongooseDouble from 'mongoose-double';
import loadClass from 'mongoose-class-wrapper';
import validate from 'mongoose-validator';
import uniqueValidator from 'mongoose-unique-validator';

mongooseDouble(mongoose);

var SchemaTypes = mongoose.Schema.Types;

let ProductSchema = new mongoose.Schema({
    supplierId: {
        type: Schema.Types.ObjectId,
        required: true
    },
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
    prices: [
        {
            type: {
                type: String,
                required:true
            },
            value: {
                type: SchemaTypes.Double,
                required:true
            }
        }
    ],
    descriptions: {
        short: String,
        long: String
    },
    images: [
        {
            type: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ]
},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});


class ProductEntity {

  getFillable()
  {
    return ['name' , 'price'];
  }

}

ProductSchema.plugin(uniqueValidator);
ProductSchema.plugin(loadClass, ProductEntity);

export default mongoose.model('Product', ProductSchema);
