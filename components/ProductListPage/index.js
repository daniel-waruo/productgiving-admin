import React from 'react'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {PRODUCTS_QUERY} from "./queries";
import compose from "lodash.flowright"
import {NextSeo} from "next-seo";
import {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import Link from "next/link";
import ProductTableSection from "./components/ProductTableSection";

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
      <MDBContainer className={"pt-4 mt-4"}>
        <NextSeo title={"Products"}/>
        <h1 className="text-center">Search Products</h1>
        <MDBContainer>
          <Link href={'/products/add'}>
            <a>
              <MDBBtn color={"light-green"} className={"rounded-pill"}>
                ADD PRODUCT
                <MDBIcon icon={"plus"} className={"mx-3"}/>
              </MDBBtn>
            </a>
          </Link>
          <form onSubmit={this.submitHandler}>
            <MDBRow>
              <MDBCol size={"12"} md={"8"}>
                <MDBInput label={"Search for a product"} group
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
          <ProductTableSection fetchMore={this.props.data.fetchMore} search={this.props.router.query.search} products={products}/>
        </MDBContainer>
      </MDBContainer>
    )
  };
}

export default withRouter(
  compose(
    graphql(
      PRODUCTS_QUERY,
      {
        options: (props) => {
          const {search} = props.router.query;
          return {
            variables: {
              query: search,
              number:10,
              fromItem:0
            }
          }
        }
      }
    )
  )(ProductsPage)
);
