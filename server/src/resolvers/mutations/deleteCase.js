module.exports = async (_, { id }, { models }) => {
  const deleteCase = await models.Case.deleteOne({ _id: id })

  if (deleteCase.deletedCount) return { id: id }
}
