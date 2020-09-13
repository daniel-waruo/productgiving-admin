export const format_errors = (errors) => {
  let error_object = {}
  errors.forEach(
    ({field, messages}) => {
      error_object[field] = messages
    }
  )
  return error_object
}
