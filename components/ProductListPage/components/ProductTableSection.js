import React from 'react'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import PropTypes from 'prop-types'
import Link from "next/link";
import {graphql} from "react-apollo";
import {DELETE_PRODUCT_MUTATION, PRODUCTS_QUERY} from "../queries";


class ProductTableSection extends React.PureComponent {

  deleteProduct = (id) => {
    const {search} = this.props;
    this.props.deleteProduct({
      refetchQueries: [{
        query: PRODUCTS_QUERY,
        variables: {
          query: search
        }
      }],
      variables: {id}
    })
  };

  render() {
    const {products} = this.props;

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
                                <MDBBtn size={"sm"}
                                        className={"rounded-pill"}
                                        onClick={() => this.deleteProduct(id)}
                                        color={"danger"}
                                        outline>
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
  products: PropTypes.array,
  search: PropTypes.string
}
export default graphql(
  DELETE_PRODUCT_MUTATION, {name: "deleteProduct"})
(ProductTableSection)
