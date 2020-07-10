import React from 'react';
import {withApollo} from "../../../apollo";
import CourseEditPage from "../../../components/CourseEditPage";
import {withApp} from "../../../components/app";

export default withApollo({ssr: false})(
  withApp(CourseEditPage, {secure: true})
);
