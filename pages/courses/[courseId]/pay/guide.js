import React from 'react';
import {withApollo} from "../../../../apollo";
import CoursePaymentGuidePage from "../../../../components/CoursePaymentGuide";
import {withStudentApp} from "../../../../components/app";

export default withApollo({ssr: false})(
  withStudentApp(CoursePaymentGuidePage, {secure: true})
);
