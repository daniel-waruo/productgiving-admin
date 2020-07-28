import React from 'react';
import {withApollo} from "../../apollo";
import Login from "../../components/LoginPage";
import {withSubscriberLayout} from "../../components/app";

Login.redirectUrl = '/member'

export default withApollo()(
  withSubscriberLayout(Login, {secure: false})
);
