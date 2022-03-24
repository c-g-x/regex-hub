module.exports = async (_, { userId }, { models }) => {
  if (userId) {
    models.UserCase.find()
  }
  return models.Case.find()
}
