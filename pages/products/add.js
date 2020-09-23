import React from 'react';
import {withApollo} from "../../apollo";
import ProductsAddPage from "../../components/ProductsAddPage";
import {withMainLayout} from "../../components/Layouts";


export default withApollo()(
  withMainLayout(ProductsAddPage, {secure: true})
);
