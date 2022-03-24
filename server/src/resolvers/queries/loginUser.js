module.exports = async (_, { username, password }, { models }) => {
  let user = await models.User.findOne({
    username: username,
    password: password,
  })
  user.favorite = (
    await models.UserCase.find({
      userId: user._id,
      favorite: true,
    })
  ).map(({ caseId }) => models.Case.findOne({ _id: caseId }))

  let createUserCaseList = await models.UserCase.find({
    userId: user._id,
    create: true,
  })
  user.create = await Promise.all(createUserCaseList.map(async ({ caseId }) => await models.Case.findOne({ _id: caseId })))
  return user
}
