import React from 'react';
import {withApollo} from "../../apollo";
import ProductsEditPage from "../../components/ProductsEditPage";
import {withMainLayout} from "../../components/Layouts";


export default withApollo()(
  withMainLayout(ProductsEditPage, {secure: true})
);
