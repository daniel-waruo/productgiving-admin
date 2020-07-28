import React from "react";
import TransactionsPage from "../../../components/TransactionsPage"
import {withMemberLayout} from "../../../components/app"
import {withApollo} from "../../../apollo";

export default withApollo({ssr:false})(
  withMemberLayout(TransactionsPage)
)