import React from "react";
import {MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import PropTypes from "prop-types";

class ProductItem extends React.PureComponent {

  render() {
    const {product: {product: { name, image}, number}} = this.props;
    return (
      <tr>
        <td>
          <img alt={`image of ${name} campaign`}
               className={"rounded-circle"}
               src={`${image}-/resize/50x50/`}/>
        </td>
        <td>{name}</td>
        <td>{number}</td>
      </tr>
    )
  }
}


ProductItem.propTypes = {
  product: PropTypes.object.isRequired
}

class ProductsSection extends React.PureComponent {


  render() {
    const {campaign} = this.props
    return (
      <MDBContainer fluid className={"my-2 pt-3 pb-5 "} >
        <h2 className={"text-underline ml-3"}>Delivery Products</h2>
        <p className={"ml-3"}>Products to be delivered to be campaign owner.</p>
        <MDBTable responsive>
          <MDBTableHead>
            <tr>
              <th colSpan={"2"}>Product</th>
              <th>Number</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              campaign.delivery.products.map(
                (product, key) => {
                  return (
                    <ProductItem key={key}
                                 product={product}/>
                  )
                }
              )
            }
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    )
  }
}

ProductsSection.propTypes = {
  campaign: PropTypes.object.isRequired,
}

export default ProductsSection
