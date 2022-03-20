module.exports = async (_, { id, input }, { models }) => {
  const aCase = await models.Case.findOne({ _id: id })
  if (aCase) {
    Object.keys(aCase).forEach((value) => {
      aCase[value] = input[value]
    })

    const newCase = await aCase.save()
    return newCase
  }
}
