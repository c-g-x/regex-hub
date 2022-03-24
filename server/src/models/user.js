const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  favorite: Array,
  create: Array,
})

const User = mongoose.model('User', userSchema)
module.exports = { User }
