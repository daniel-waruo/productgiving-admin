import React from 'react'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import PropTypes from 'prop-types'
import Link from "next/link";
import {graphql} from "react-apollo";
import {DELETE_PRODUCT_MUTATION, PRODUCTS_QUERY} from "../queries";

const ProductTableItem = ({product:{id,name,image,price,}}) => {
  return (
    <tr>
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

class ProductTableSection extends React.PureComponent {
  state = {
    hasMore:true
  }

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

  loadMore = (fromItem) =>{
    const {search} = this.props;
    this.props.fetchMore({
      variables: {
        query: search,
        number:10,
        fromItem
      },
      // concatenate old and new entries
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const addedProducts = fetchMoreResult.products;
        if (addedProducts.length < 1){
          this.setState({hasMore:false})
        }
        return { products: [...previousResult.products,...addedProducts]}
      },
    });
  }
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
                        (product, key) => {
                          return (
                            <ProductTableItem key={key} product={product}/>
                          )
                        }
                      )
                    }
                  </MDBTableBody>
                </MDBTable>
                {this.state.hasMore ?
                  (<MDBCol size="12" className="mt-3 mb-2 text-center">
                    <MDBBtn
                      onClick={()=>this.loadMore(products.length)}
                      color={"white"}
                      className={"rounded-pill mt-5"} >
                      Load More
                      <MDBIcon icon={'angle-down'} className={"mx-2"}/>
                    </MDBBtn>
                  </MDBCol>):null
                }
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
