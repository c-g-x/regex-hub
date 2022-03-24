module.exports = async (_, { username, password }, { models }) => {
  if (username && password) {
    let queryResult = await models.User.findOne({
      username: username,
    })

    if (!queryResult) {
      return await models.User.create({ username, password })
    }
  }
  // 校验失败...
  return null
}
