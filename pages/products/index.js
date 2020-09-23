import React from 'react';
import {withApollo} from "../../apollo";
import ProductsPage from "../../components/ProductsPage";
import {withMainLayout} from "../../components/Layouts";


export default withApollo()(
  withMainLayout(ProductsPage, {secure: true})
);
