import messageResolvers from "./messages";
import authResolvers from "./auth";
import {Mutation as votingMutation, SeatType,CandidateType} from "./voting";

export default {
  Mutation: {
    ...authResolvers,
    ...messageResolvers,
    ...votingMutation
  },
  SeatType,
  CandidateType
};