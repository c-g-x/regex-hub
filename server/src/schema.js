const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    favorite: [Case!] # 收藏的用例列表
    create: [Case!] # 创建的用例列表
    token: String! # auth
  }

  type Case {
    _id: ID!
    title: String!
    re: String! # regex pattern
    test: String # test
    user: User
  }

  input CreateCaseInput {
    title: String!
    re: String!
    test: String
  }

  input UpdateCaseInput {
    title: String!
    re: String! # regex pattern
    test: String
  }

  input getCasesInput {
    userId: ID
    favorite: Boolean
    create: Boolean
  }

  type Query {
    getUser(id: ID!): User
    getCases(userId: ID): [Case!]!
    loginUser(username: String!, password: String!): User
    getCase(id: ID!): Case
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
    deleteUser(id: ID!): Boolean!

    createCase(input: CreateCaseInput, userId: ID!): Case
    updateCase(id: ID!, input: UpdateCaseInput!): Case!
    deleteCase(id: ID!): ID
    favoriteCase(id: ID!): Boolean!
  }
`

module.exports = typeDefs
