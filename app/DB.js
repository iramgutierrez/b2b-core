import mongoose from 'mongoose'

class DB {
  constructor(mongoose){
    this.mongoose = mongoose
  }

  initialize()
  {
    this.mongoose.Promise = global.Promise
    this.mongoose.connect('mongodb://localhost/b2b_core')
  }
}

export default new DB(mongoose)
