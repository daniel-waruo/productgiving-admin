import React from 'react'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {PRODUCTS_QUERY} from "./queries";
import ProductListSection from "./components/ProductListSection";
import compose from "lodash.flowright"
import {NextSeo} from "next-seo";
import {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import Link from "next/link";

class ProductsPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search
    }
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.router.push({
        pathname: '/products',
        query: {
          search: this.state.query
        }
      }
    );
  }
  changeHandler = e => {
    this.setState({query: e.target.value});
  }

  render() {
    const {data: {loading, error, products}} = this.props;

    if (loading) return <Loader/>;

    if (error) return <h1>{error.message}</h1>;

    return (
      <MDBContainer className={"pt-4"}>
        <NextSeo title={"Products"}/>
        <h1>Search Products</h1>
        <MDBContainer>
          <Link href={'/products/add'}>
            <a>
              <MDBBtn color={"light-green"} className={"rounded-pill"}>
                ADD PRODUCT
                <MDBIcon icon={"shopping-cart"} className={"mx-3"}/>
              </MDBBtn>
            </a>
          </Link>
          <form onSubmit={this.submitHandler}>
            <MDBRow>
              <MDBCol size={"12"} md={"8"}>
                <MDBInput label={"Search for a product"} group required
                          value={this.state.query}
                          onChange={this.changeHandler}/>
              </MDBCol>
              <MDBCol size={"12"} md={"4"} className={"text-center"}>
                <MDBBtn color={"light-green"} type={"submit"} className={"rounded-pill"} outline>
                  <MDBIcon icon={'search'} className={"mx-2"}/>
                  SEARCH
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
        <ProductListSection products={products}/>
      </MDBContainer>
    )
  };
}

export default withRouter(
  compose(
    graphql(PRODUCTS_QUERY)
  )(ProductsPage)
);