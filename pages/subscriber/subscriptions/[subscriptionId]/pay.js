import React from 'react';
import {withApollo} from "../../../../apollo";
import SubscriptionPaymentPage from "../../../../components/SubscriptionPaymentPage";
import {withSubscriberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(SubscriptionPaymentPage, {secure: false})
);
