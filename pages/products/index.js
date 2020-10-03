import React from 'react';
import {withApollo} from "../../apollo";
import ProductsPage from "../../components/ProductListPage";
import {withMainLayout} from "../../components/Layouts";


export default withApollo({ssr:false})(
  withMainLayout(ProductsPage, {secure: true})
);
