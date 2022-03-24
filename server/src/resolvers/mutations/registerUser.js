module.exports = async (_, { username, password }, { models }) => {
  return models.Case.findOne({
    username: username,
    password: password,
  })
}
