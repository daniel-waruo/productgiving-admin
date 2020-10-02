import React from 'react'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
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

class ProductTableSection extends React.PureComponent {

  render() {
    const {products} = this.props;
    //list of the courses
    const productsList = products.map(
      (product, key) => (
        <MDBCol key={key} size={"12"} md={"4"} className={"my-2"}>
          <ProductCard product={product}/>
        </MDBCol>
      )
    )
    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBRow center>
            <MDBCol size={"12"}>
              <MDBRow>
                <MDBTable responsive>
                  <MDBTableHead>
                    <tr>
                      <th colSpan={"2"}>Product</th>
                      <th>Price(KES)</th>
                      <th>Category</th>
                      <th colSpan={"2"}/>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      products.map(
                        ({id, name, price, image, category}, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <Link href={"/products/[id]"} as={`/products/${id}`}>
                                  <a>
                                    <img alt={`image of ${name}`}
                                         className={"rounded-circle"}
                                         src={`${image}-/resize/50x50/`}/>
                                  </a>
                                </Link>
                              </td>
                              <td>
                                <Link href={"/products/[id]"} as={`/products/${id}`}>
                                  <a className={"py-3"}>{name}</a>
                                </Link>
                              </td>
                              <td>{`Ksh.${price}`}</td>
                              <td/>
                              <td>
                                <Link href={"/products/[id]"} as={`/products/${id}`}>
                                  <a>
                                    <MDBBtn size={"sm"} className={"rounded-pill"} color={"light-blue"} outline>
                                      <MDBIcon icon={"edit"} className={"mx-2"}/>
                                      edit
                                    </MDBBtn>
                                  </a>
                                </Link>
                              </td>
                              <td>
                                <MDBBtn size={"sm"} className={"rounded-pill"} color={"danger"} outline>
                                  <MDBIcon icon={"trash"} className={"mx-2"}/>
                                  delete
                                </MDBBtn>
                              </td>
                            </tr>
                          )
                        }
                      )
                    }
                  </MDBTableBody>
                </MDBTable>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  };
}

ProductTableSection.propTypes = {
  products: PropTypes.array
}
export default ProductTableSection