import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Q from 'q'
import mongodb from 'mongodb'
import uuid from 'uuid'
import mongoose from 'mongoose'

import Repository from './Repositories/ProductRepository'
import Entity from './Entities/ProductEntity'

mongoose.Promise = global.Promise
chai.use(chaiAsPromised)

var should = chai.should()
var expect = chai.expect

var product = {
    name: uuid.v1(),
    price: 121212
}
var resource

describe('ProductRepository', () => {

    before(() => {
        mongoose.connect('mongodb://localhost/b2b_core')
        return (new Entity(product)).save()
            .then(response => {
                resource = response
                return Q.resolve()
            })
    })
    describe('create', () =>{
        it('should return a new Entity', () => {
            Repository.create().should.be.an.instanceOf(Entity);
        });
    })
    describe('all', () =>{
        it('should return an array with all entities', () => {

            return Repository.all()
                .then(collection => {
                    collection.should.be.an.instanceOf(Array)
                    collection.shift().should.be.an.instanceOf(Entity)
                    collection.pop().name.should.equal(product.name)
                })
        })
    })
    describe('findById' , () => {
        it('should return the last product saved' , () => {

            return Repository.findById(resource._id)
                .then(response => {
                    response.should.be.an.instanceOf(Entity)
                    response.name.should.equal(product.name)
                    response.price.should.equal(product.price)
                })
        })

        it('should return a reject promise trying to find a product with non-existent _id' , () => {
            return Repository.findById(new mongodb.ObjectID()).should.be.rejectedWith('Entity not found')
        })
    })

    describe('findOneByName' , () => {
        it('should return the last product saved' , () => {

            return Repository.findOneByName(product.name)
                .then(response => {
                    response.should.be.an.instanceOf(Entity)
                    response.name.should.equal(product.name)
                    response.price.should.equal(product.price)
                })
        })
        it('should return reject promise trying to find a product with non-existent name' , () => {
            return Repository.findOneByName('non-existent name').should.be.rejectedWith('Entity not found')
        })
    })

    after(() => {
        mongoose.connection.close()
        resource.remove()
    })

})