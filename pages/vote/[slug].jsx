import React from 'react';
import {withApollo} from "../../apollo";
import {withApp} from "../../components/app";
import CandidateVote from "../../components/vote/candidates"

export default withApollo()(
  withApp(
    CandidateVote
  )
);
