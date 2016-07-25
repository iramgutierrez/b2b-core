import mongoose from 'mongoose';
import ProductEntity from './Entities/ProductEntity';
import CategoryEntity from './Entities/CategoryEntity';

var SchemaTypes = mongoose.Schema.Types;

let ProductSchema = new mongoose.Schema({
        name: {
            type: String,
            index: true
        },
        descriptions: {
            type: String
        },
        products: [
            {
                type: SchemaTypes.ObjectId,
                ref: ProductEntity
            }
        ],
        images: {
            full: {
                name: {
                    type: String
                }
            }
        },
        active: {
            type: Boolean
        },
        parent_id: {
            type: SchemaTypes.ObjectId,
            ref: CategoryEntity
        },
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

export default ProductSchema;