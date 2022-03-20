module.exports = async (_, {}, { models }) => {
  console.log(models)
  return await models.CaseModel.find()
}
