import React from 'react';
import {withApollo} from "../../../../apollo";
import CoursePage from "../../../../components/SubscriptionPage";
import {withMemberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(CoursePage, {secure: true})
);
