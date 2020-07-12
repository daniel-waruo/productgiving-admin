import React from 'react';
import {withApollo} from "../../../../apollo";
import CoursePaymentPage from "../../../../components/CoursePaymentPage";
import {withStudentApp} from "../../../../components/app";

export default withApollo({ssr: false})(
  withStudentApp(CoursePaymentPage, {secure: true})
);
