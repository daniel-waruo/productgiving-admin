import React from 'react';
import {withApollo} from "../../apollo";
import Login from "../../components/LoginPage";
import {withMemberLayout} from "../../components/app";

Login.redirectUrl = '/member'

export default withApollo()(
  withMemberLayout(Login,{secure:false})
);
