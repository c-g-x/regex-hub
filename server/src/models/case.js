const mongoose = require('mongoose')

const { Schema } = mongoose

const caseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  re: {
    type: String,
  },
  test: {
    type: String,
  },
})

const Case = mongoose.model('Case', caseSchema)
module.exports = { Case }
