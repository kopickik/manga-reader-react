import _get from 'lodash/fp/get'

const formatGraphQLErrors = (error) => {
  return error.message
    ? error.message
    : JSON.parse({
        errors: [
          {
            message: 'Other error message in payload',
          },
        ],
      })
}

export default formatGraphQLErrors
