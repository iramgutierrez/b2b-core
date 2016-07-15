import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Q from 'q'
import uuid from 'uuid'
import mongoose from 'mongoose'

import Manager from './Managers/ProductManager'

Manager.setEntity(OtherEntity);
import Entity from './Entities/ProductEntity'

mongoose.Promise = global.Promise
chai.use(chaiAsPromised)

var should = chai.should()
var expect = chai.expect

var name = uuid.v1()
var resource

describe('ProductManager', (done) => {

    before(function(done) {
        mongoose.connect('mongodb://localhost/b2b_core')
        Manager.setEntity(new Entity)
        return Entity
                    .remove({name:name})
                    .then(entity => Q.resolve(done()) )
                    .catch(err => Q.reject(done()) )

    })
    describe('Save', (done) => {
        it('should return a error trying to save a product without name', () => {

            let product = {
                price: 12
            }
            return Manager.save(product).should.be.rejected
        })
        it('should return a instance of Entity trying to save a new product', () => {

            let product = {
                name: name,
                price: '12200'
            }
            return Manager.save(product)
                .then(response => {
                    resource = response
                    return response.should.be.an.instanceOf(Entity);
                })
        })
    })
    describe('Update', (done) => {


        it('should return the same instance of Entity trying to update recent product saved', () => {
            var newPrice = 1212
            resource.price = newPrice

            return Manager.update(resource)
                .then(response => {
                    resource = response
                    response.should.be.an.instanceOf(Entity);
                    return response.price.should.equal(newPrice)
                })
        })
    })

    describe('Delete', (done) => {

        it('should return true triyng to remove recent product updated', () => {
            Manager.setEntity(resource)
            return Manager.delete().should.eventually.equal(true)
        })
    })
    after(() => {
        mongoose.connection.close()
    })
})