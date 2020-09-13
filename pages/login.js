import React from 'react';
import {withApollo} from "../apollo";
import Login from "../components/LoginPage";
import {withMainLayout} from "../components/Layouts";


export default withApollo()(
  withMainLayout(Login, {secure: false})
);
