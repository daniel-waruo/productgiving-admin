import React from 'react';
import {withApollo} from "../../apollo";
import ProductsAddPage from "../../components/ProductsAddPage";
import {withMainLayout} from "../../components/Layouts";


export default withApollo({ssr:false})(
  withMainLayout(ProductsAddPage, {secure: true})
);
