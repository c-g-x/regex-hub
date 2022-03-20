module.exports = async (_, { input }, { models }) => {
  let aCase = await models.Case.findOne({
    re: input.re,
  });
  if (aCase) {

  }
  return await models.Case.create(input)
}
