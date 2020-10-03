import React from "react";
import {EDIT_PRODUCT_MUTATION} from "./queries";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {NextSeo} from "next-seo";
import {format_errors} from "../../_helpers";
import {PRODUCT_QUERY, PRODUCTS_QUERY} from "../ProductListPage/queries";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import Loader from "../Loader";
import {withRouter} from "next/router";
import {redirect} from "../App";
import UploadPhotoField from "../UploadPhotoField";

class ProductEditPage extends React.Component {
  state = {
    name: "",
    description: "",
    price: "",
    image: "",
    errors: {},
    submitted: false
  }

  mutationOptions = {
    refetchQueries: [{query: PRODUCTS_QUERY}]
  };

  completeHandler = ({editProduct: {product, errors}}) => {
    if (product) {
      // redirect to subscription page
      redirect(`/products`)
      return
    }
    this.setState({
      submitted: true,
      errors: format_errors(errors)
    })
  }

  getData = () => {
    const {name, description, price, image} = this.state
    const {data: {product}} = this.props;
    return {
      id: product.id,
      name: name ? name : product.name,
      description: description ? description : product.description,
      price: price ? price : product.price,
      image: image ? image : product.image
    }
  }

  changeHandler = object => {
    this.setState(object);
  };

  render() {
    const {data: {loading, error, product}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;
    if (!product) return <h1>No Such Product</h1>;
    const {submitted, errors} = this.state;
    return (
      <>
        <NextSeo title={product.name}/>
        <MDBContainer>

          <h1 className={"mx-4"}>Edit {product.name}</h1>
          <MDBCol size={"12"} md={"10"}>
            <MutationForm mutation={EDIT_PRODUCT_MUTATION}
                          data={this.getData()}
                          mutationOptions={this.mutationOptions}
                          onCompleted={this.completeHandler}>
              <MDBRow>
                <MDBCol size={"12"} md={"6"}>
                  <Field
                    initial={product.name}
                    submitted={submitted}
                    label={"Name"}
                    required
                    fieldErrors={errors.name}
                    onChange={
                      e => this.changeHandler({name: e.target.value})
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"} md={"6"}>
                  <Field
                    initial={product.description}
                    submitted={submitted}
                    label={"Description"}
                    type={"textarea"}
                    required
                    fieldErrors={errors.description}
                    onChange={
                      e => this.changeHandler({description: e.target.value}
                      )
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"} md={"6"}>
                  <Field
                    initial={product.price}
                    submitted={submitted}
                    label={"Price"}
                    type={"number"}
                    required
                    fieldErrors={errors.price}
                    onChange={
                      e => this.changeHandler({price: e.target.value})
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"} md={"6"}>
                  <UploadPhotoField label={"Product Image"} hide={false}
                                    initial={product.image}
                                    onChange={image => this.setState({image: image})}/>
                </MDBCol>
                <MDBCol size={"12"} className={"text-center my-4"}>
                  <MDBBtn color={"light-green"} type={"submit"} className={"rounded-pill"}>SUBMIT</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MutationForm>
          </MDBCol>
        </MDBContainer>
      </>
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
  )(ProductEditPage)
)