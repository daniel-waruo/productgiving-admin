import messageResolvers from "./messages";
import authResolvers from "./auth";

export default {
  Mutation: {
    ...authResolvers,
    ...messageResolvers
  }
};