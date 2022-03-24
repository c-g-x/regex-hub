module.exports = async (_, { id, input }, { models }) => {
  const aCase = await models.Case.findOne({ _id: id })
  if (aCase) {
    Object.keys(input).forEach((value) => {
      aCase[value] = input[value]
    })

    return await aCase.save()
  }
}
