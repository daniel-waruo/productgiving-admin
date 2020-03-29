import React from 'react';
import {withApollo} from "../../apollo";
import Results from "../../components/vote/results";
import {withApp} from "../../components/app";

export default withApollo({ssr:true})(
  withApp(Results)
);
