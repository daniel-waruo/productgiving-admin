import React from 'react';
import {withApollo} from "../../../apollo";
import AddSubscriberSubscriptionsPage from "../../../components/AddSubscriberSubscriptionsPage";
import {withSubscriberLayout} from "../../../components/app";

export default withApollo({ssr: true})(
  withSubscriberLayout(AddSubscriberSubscriptionsPage, {secure: false})
);
