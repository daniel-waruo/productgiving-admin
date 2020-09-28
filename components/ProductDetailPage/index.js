import React from "react";
import {MDBContainer} from "mdbreact";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {PRODUCT_QUERY} from "./queries";
import {withRouter} from "next/router";
import Loader from "../Loader";

class ProductDetailPage extends React.PureComponent {
  render() {
    const {data: {loading, error, product}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;
    if (!product) return <h1>No Such Product</h1>
    return (
      <MDBContainer>
        <h1>{product.name}</h1>
        <p>
          {product.description}
        </p>
      </MDBContainer>
    )
  }
}

export default withRouter(compose(
  graphql(PRODUCT_QUERY, {
    options: (props) => {
      const {id} = props.router.query;
      return {
        variables: {id}
      }
    }
  })
  )(ProductDetailPage)
)