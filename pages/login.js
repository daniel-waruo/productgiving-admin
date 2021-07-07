import React from 'react';
import {withApollo} from "../apollo";
import Login from "../components/LoginPage";
import {withMainLayout} from "../components/Layouts";


export default withApollo({ssr:false})(
  withMainLayout(Login, {secure: false})
);
