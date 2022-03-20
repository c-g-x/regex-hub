const { ApolloServer } = require('apollo-server')
const connectDb = require('./config/db')
connectDb()
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is ready at ${url}`)
})
