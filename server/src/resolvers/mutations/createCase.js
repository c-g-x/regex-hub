module.exports = async (_, { input, userId }, { models }) => {
  // let exist = !!(await models.Case.findOne({
  //   re: input.re,
  // }))

  // if (exist) {
  //   return null
  // }

  let newCase = await models.Case.create(input)
  models.UserCase.create({
    userId: userId,
    caseId: newCase._id,
    create: true,
  })
  return newCase
}
