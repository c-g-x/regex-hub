const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  id: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = { User }
