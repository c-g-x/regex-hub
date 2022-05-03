// @ts-ignore
export const CASES_QUERY = gql`
  query Cases {
    getCases {
      _id
      title
      re
      test
    }
  }
`

export const SIMPLE_CASES_QUERY = gql`
  query Cases {
    getCases {
      _id
      title
    }
  }
`

export const LOGIN = gql`
  query loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      _id
      username
      favorite {
        _id
        title
      }
      create {
        _id
        title
      }
    }
  }
`

export const REGISTER = gql`
  mutation registerUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      _id
      username
    }
  }
`

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      username
      favorite {
        _id
        title
      }
      create {
        _id
        title
      }
    }
  }
`
