import React from 'react';
import {withApollo} from "../../../apollo";
import CourseEditPage from "../../../components/SubscriptionEditPage"
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(CourseEditPage, {secure: true})
);
