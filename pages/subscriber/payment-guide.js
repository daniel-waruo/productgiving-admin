import React from 'react';
import {withApollo} from "../../apollo";
import CoursePaymentGuidePage from "../../components/SubscriptionPaymentGuide";
import {withSubscriberLayout} from "../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(CoursePaymentGuidePage, {secure: false})
);
