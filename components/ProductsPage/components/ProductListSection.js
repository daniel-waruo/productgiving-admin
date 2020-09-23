import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import ProductCard from "./ProductCard";
import PropTypes from 'prop-types'
import Link from "next/link";

const PriceListItem = ({price, interval}) => {
  return (
    <MDBCol size={"12"} className={"bold-text px-1 text-center"}>
      <p className={"bold-text p-1 rounded-pill z-depth-1 bg-teal"}>@Ksh.{price} {interval}</p>
    </MDBCol>
  )
}

class ProductListSection extends React.PureComponent {

  render() {
    const {products} = this.props;
    //list of the courses
    const productsList = products ? products.map(
      (product, key) => (
        <MDBCol key={key} size={"12"} md={"4"} className={"my-2"}>
          <ProductCard product={product}/>
        </MDBCol>
      )
    ) : null
    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBRow center>
            <MDBCol size={"12"}>
              <MDBRow>
                {productsList}
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  };
}

ProductListSection.propTypes = {
  products: PropTypes.array
}
export default ProductListSection