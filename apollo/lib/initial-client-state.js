export const initialClientStateCache = {
  messages: null,
  loginErrors: null,
  candidateDialog: {
    __typename: "CandidateDialog",
    open: false,
    candidate: null
  },
  submitVote: {
    __typename: "SubmitVote",
    open: false
  }
};