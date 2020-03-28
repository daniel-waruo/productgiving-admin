import React from 'react';
import {withApollo} from "../../apollo";
import Vote from "../../components/vote";
import {withApp} from "../../components/app";

export default withApollo({ssr:false})(
  withApp(Vote)
);
