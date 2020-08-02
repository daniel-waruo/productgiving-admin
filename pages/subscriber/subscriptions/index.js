import React from 'react';
import {withApollo} from "../../../apollo";
import SubscriberSubscriptionsPage from "../../../components/SubscriberSubscriptionsPage";
import {withSubscriberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(SubscriberSubscriptionsPage, {secure: true})
);
