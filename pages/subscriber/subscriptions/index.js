import React from 'react';
import {withApollo} from "../../../apollo";
import MemberSubscriptionsPage from "../../../components/SubscriberSubscriptionsPage";
import {withSubscriberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(MemberSubscriptionsPage, {secure: true})
);
