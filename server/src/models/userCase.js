const mongoose = require('mongoose')

const { Schema } = mongoose

const userCaseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  caseId: {
    type: String,
    required: true,
  },
  favorite: Boolean,
  create: Boolean,
})

const UserCase = mongoose.model('UserCase', userCaseSchema)
module.exports = { UserCase }
