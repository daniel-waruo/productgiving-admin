import cookie from "js-cookie";

export const getUserSelection = (userID) => {
  let votes = cookie.get("votes");
  if (votes) {
    votes = JSON.parse(votes);

    const keys = Object.keys(votes);
    if (keys.find(value => value === userID) && (keys.length > 1)) {
      // remove other user ids from cookies to prevent voting leaks
      keys.forEach(
        value => {
          if (value !== userID)
            delete votes[value]
        }
      );
      // set the cookies
      cookie.set("votes", votes);
    }
    return votes[userID]
  }
  return {}
};

export const getCandidateIds = (userID) => {
  // get the user selection
  const selection = getUserSelection(userID);
  // get seats from selection
  const seats = Object.keys(selection);
  const candidateIds = [];
  // push candidate selected from every seat
  seats.forEach(
    (seat) => {
      candidateIds.push(selection[seat])
    }
  );
  // return candidae Ids
  return candidateIds
};

export const parseError = error => {
  let errors = [];

  Object.entries(error).forEach(
    entry => {
      entry[1].forEach(
        message => {
          errors.push({
            text: message,
            type: 'danger',
            __typename: 'Message'
          });
        }
      )
    });

  return errors;
};
