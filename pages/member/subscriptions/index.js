import React from 'react';
import {withApollo} from "../../../apollo";
import SubscriptionsPage from "../../../components/SubscriptionsPage";
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(SubscriptionsPage, {secure: true})
);
