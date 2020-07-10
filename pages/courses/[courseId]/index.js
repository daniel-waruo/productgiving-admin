import React from 'react';
import {withApollo} from "../../../apollo";
import CoursePage from "../../../components/CoursePage";
import {withApp} from "../../../components/app";

export default withApollo({ssr: false})(
  withApp(CoursePage, {secure: true})
);
