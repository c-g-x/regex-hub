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
