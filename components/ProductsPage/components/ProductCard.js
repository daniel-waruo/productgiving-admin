import React from "react";
import {MDBBtn, MDBCard, MDBCardImage, MDBIcon} from "mdbreact";
import PropTypes from 'prop-types'
import Link from "next/link";

export default class ProductCard extends React.PureComponent {
  render() {
    const {product} = this.props;
    return (
      <div className={"view"} style={{borderRadius: "1rem"}}>
        <MDBCard style={{borderRadius: "1rem"}}>
          <MDBCardImage zoom
                        src={`${product.images[0]}-/resize/200x200/`}
                        waves
                        overlay={"light-green-light"}
                        style={{
                          borderTopRightRadius: "1rem",
                          borderTopLeftRadius: "1rem",
                          height: "14rem",
                          width: "100%"
                        }}/>
        </MDBCard>
        <div className={`mask`}>
          <h4 className={"text-white text-center pt-3"}>{product.name}</h4>
          <div className={"flex-center"}>
            <Link href={'/products/[id]'} as={`/products/${product.id}`}>
              <a>
                <MDBBtn tag={"span"} color={"light-green"} className={"rounded-pill"}>
                  <MDBIcon icon={"eye"} className={"mx-1"}/>
                  View
                </MDBBtn>
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}