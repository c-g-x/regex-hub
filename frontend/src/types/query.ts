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
