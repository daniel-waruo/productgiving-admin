import {APP_QUERY} from "../../components/app/queries";
import cookie from 'js-cookie';
import {getUserSelection} from "../../_helpers";
import gql from "graphql-tag"


const vote = (userID, {seatSlug, candidateID}) => {

  // initialize votes as an empty project
  let votes = {};
  // get the parsed user selection from votes
  let userSelection = getUserSelection(userID);

  if (!userSelection)
    userSelection = {};
  // set the seat and candidate
  userSelection[seatSlug] = candidateID;

  // stringify the object and set the cookie
  votes[userID] = userSelection;

  // set the votes to cookie
  cookie.set("votes", votes)
};


export const Mutation = {
  vote: async (obj, args, {cache, getCacheKey}) => {
    // get seat id and candidate id from arguments
    const {seatSlug, candidateID} = args;

    // get user id from apollo cache
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });

    // call vote function which will save current data in the cookies
    await vote(id, {seatSlug, candidateID});

    // show the candidate dialog
    const cacheCandidateID = getCacheKey({__typename: 'CandidateType', id: candidateID});
    // get candidate from cache
    const candidate = cache.readFragment({
      id: cacheCandidateID,
      fragment: gql`
        fragment myCandidate on CandidateType {
          id
          firstName
          lastName
          image
        }
      `,
    });
    // show the candidate dialog by updating the cache
    cache.writeData({
      data: {
        candidateDialog: {
          __typename: "CandidateDialog",
          open: true,
          candidate: candidate
        }
      }
    });
    // return true
    return true
  },
  closeCandidateDialog: async (obj, args, {cache}) => {
    // close the candidate dialog
    cache.writeData({
      data: {
        candidateDialog: {
          __typename: "CandidateDialog",
          open: false,
          candidate: null
        }
      }
    });
    return true
  }
};

export const SeatType = {
  voted: async (obj, args, {cache}) => {
    // get id from cache
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });
    // get user selection from cookies
    const selection = getUserSelection(id);
    // check if the object has been selected
    // if so return a CandidateType to field
    if (selection) {
      // get object candidates and check whether
      // the id in the cookies matches the candidates
      // returned by the object
      // if so return the candidate
      if (selection[obj.slug] && obj.candidates) {
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
  selected: async (obj, args, {cache}) => {
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });
    // get user selection from cookies
    const selection = getUserSelection(id);
    if (selection) {
      // get slug from object
      const {seat: {slug}} = obj;
      // check if the id in the selection is equal to the object id
      return selection[slug] === obj.id;
    }
    return false
  }
};