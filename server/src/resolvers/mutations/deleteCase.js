module.exports = async (_, { id }, { models }) => {
  const deleteCase = await models.Case.deleteOne({ _id: id })
  if (deleteCase.deletedCount !== 0) {
    models.UserCase.deleteMany({
      caseId: id,
    })
    return id
  }
  return null
}
