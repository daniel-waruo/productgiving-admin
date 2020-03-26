import messageResolvers from "./messages";
import authResolvers from "./auth";
import {Mutation as votingMutation, SeatType} from "./voting";

export default {
  Mutation: {
    ...authResolvers,
    ...messageResolvers,
    ...votingMutation
  },
  SeatType
};