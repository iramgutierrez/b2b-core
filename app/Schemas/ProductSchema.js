import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

var SchemaTypes = mongoose.Schema.Types;

let ProductSchema = new mongoose.Schema({
        sku: {
            type: String,
            unique: true,
            index:true
        },
        name: {
            type: String
        },
        descriptions: {
            short: {
                type: String
            },
            long: {
                type: String
            }
        },
        manufacture: {
            type: String
        },
        details: [
            {
                name: {
                    type: String
                },
                value: {
                    type: String
                }
            }
        ],
        shipping_details: {
            weight: {
                type: Number
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            depth: {
                type: Number
            },
        },
        stock: {
            quantity: {
                type: Number
            }
        },
        prices: [
            {
                type: {
                    type: String
                },
                value: {
                    type: Number
                },
                taxes: {
                    type: Object
                }
            }
        ],
        current_price: {
            type: SchemaTypes.ObjectId
        },
        images: {
            full: {
                name: {
                    type: String
                }
            }
        },
        categories: [
            {
                name: {
                    type: String
                },
                children: {
                    type: Object
                }
            }
        ],
        created_at: {
            type: Date
        },
        created_by: {
            type: SchemaTypes.ObjectId
        },
        updated_at: {
            type: Date
        },
        updated_by: {
            type: SchemaTypes.ObjectId
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });


ProductSchema.plugin(uniqueValidator);

export default ProductSchema;