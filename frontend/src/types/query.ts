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
