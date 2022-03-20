const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    favorite: [Case] # 收藏
    token: String! # auth
  }

  type Case {
    _id: ID!
    title: String!
    re: String! # regex pattern
    test: String # test
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

  type Query {
    getUser(id: ID!): User
    getCases: [Case]
    #    getCaseById(id: ID!): Case
  }

  type Mutation {
    loginUser(username: String!, password: String!): User!
    registerUser(username: String!, password: String!): User!
    deleteUser(id: ID!): Boolean!

    createCase(input: CreateCaseInput): Case
    updateCase(id: ID!, input: UpdateCaseInput!): Case!
    deleteCase(id: ID!): ID!
    favoriteCase(id: ID!): Boolean!
  }
`

module.exports = typeDefs
