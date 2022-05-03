module.exports = async (_, { id }, { models }) => {
  let user = await models.User.findOne({
    _id: id,
  })
  user.favorite = (
    await models.UserCase.find({
      userId: user._id,
      favorite: true,
    })
  ).map(({ caseId }) => models.Case.findOne({ _id: caseId }))

  let createUserCaseIdList = await models.UserCase.find({
    userId: user._id,
    create: true,
  })

  // user.create = createUserCaseIdList.map(async ({ caseId }) => await models.Case.findOne({ _id: caseId }))
  const createUserCaseList = await Promise.all(createUserCaseIdList.map(async ({ caseId }) => await models.Case.findOne({ _id: caseId })))
  user.create = createUserCaseList.filter((item) => item !== null)
  return user
}
