import React from 'react';
import {withApollo} from "../../apollo";
import CoursesPage from "../../components/CoursesPage";
import {withApp} from "../../components/app";

export default withApollo({ssr:false})(
  withApp(CoursesPage,{secure:true})
);
