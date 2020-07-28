import React from 'react';
import {withApollo} from "../../../../apollo";
import MemberSubscriptionPage from "../../../../components/SubscriberSubscriptionPage";
import {withSubscriberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(MemberSubscriptionPage, {secure: true})
);
