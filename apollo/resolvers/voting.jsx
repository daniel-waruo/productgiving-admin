import {APP_QUERY} from "../../components/app/queries";
import cookie from 'js-cookie';
import {getUserSelection} from "../../_helpers";

const vote = (userID, {seatSlug, candidateID}) => {

  // initialize votes as an empty project
  let votes = {};
  // get the parsed user selection from votes
  let userSelection = getUserSelection(userID);

  // set the seat and candidate
  userSelection[seatSlug] = candidateID;

  // stringify the object and set the cookie
  votes[userID] = userSelection;

  // set the votes to cookie
  cookie.set("votes", votes)
};


export const Mutation = {
  vote: async (obj, args, {cache, getCacheKey}, info) => {
    // get seat id and candidate id from arguments
    const {seatSlug, candidateID} = args;

    // get user id from apollo cache
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });
    // call vote function which will save current data in the cookies
    await vote(id, {seatSlug, candidateID});
    // return true
    return true
  }
};

export const SeatType = {
  voted: async (obj, args, {cache}, info) => {
    // get id from cache
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });
    // get user selection from cookies
    const selection = getUserSelection(id);
    // check if the object has beend selected
    // if so return a CandidateType to field
    if (selection[obj.slug]) {
      // get object candidates and check whether
      // the id in the cookies matches the candidates
      // returned by the object
      // if so return the candidate
      if (obj.candidates) {
        return obj.candidates.find(
          ({id}) => {
            return id === selection[obj.slug]
          }
        )
      }
    }
    // return null if the candidate has not been selected
    return null;
  }
};

export const CandidateType = {
  selected: async (obj, args, {cache}, info) => {
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });
    // get user selection from cookies
    const selection = getUserSelection(id);
    // get slug from object
    const {seat: {slug}} = obj;
    // check if the id in the selection is equal to the object id
    return selection[slug] === obj.id;
  }
};