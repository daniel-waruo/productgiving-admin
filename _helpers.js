export const parseError = error => {
  let errors = [];

  Object.entries(error).forEach(
    entry => {
      entry[1].forEach(
        message => {
          errors.push({
            text: message,
            type: 'warning',
            __typename: 'Message'
          });
        }
      )
    });

  return errors;
};
