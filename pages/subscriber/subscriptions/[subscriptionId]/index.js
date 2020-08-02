import React from 'react';
import {withApollo} from "../../../../apollo";
import SubscriberSubscriptionPage from "../../../../components/SubscriberSubscriptionPage";
import {withSubscriberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(SubscriberSubscriptionPage, {secure: true})
);
