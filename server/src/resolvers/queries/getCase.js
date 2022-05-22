module.exports = async (_, { id }, { models }) => {
  let { userId } = await models.UserCase.findOne({ caseId: id, create: true })
  let aCase = await models.Case.findOne({ _id: id })
  aCase.user = await models.User.findOne({ _id: userId })
  return aCase
}
