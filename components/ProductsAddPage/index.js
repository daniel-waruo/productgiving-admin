import React from "react";
import {ADD_PRODUCT_MUTATION} from "./queries";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {NextSeo} from "next-seo";
import {format_errors} from "../../_helpers";
import {PRODUCTS_QUERY} from "../ProductListPage/queries";
import {redirect} from "../App";
import UploadPhotoField from "../UploadPhotoField";

class ProductAddPage extends React.Component {
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

  completeHandler = ({createProduct: {product, errors}}) => {
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
    return {name, description, price, image}
  }

  changeHandler = object => {
    this.setState(object);
  };

  setImages = url => {
    let {images} = this.state;
    if (!images.find(imageUrl => url === imageUrl)) {
      images.push(url);
      this.setState({images: images});
    }
  }

  render() {
    const {submitted, errors} = this.state;

    return (
      <>
        <NextSeo title={"Add Product"}/>
        <h1 className={"mx-4"}>Add Product</h1>
        <MDBContainer>
          <MDBCol size={"12"} md={"10"}>
            <MutationForm mutation={ADD_PRODUCT_MUTATION}
                          data={this.getData()}
                          mutationOptions={this.mutationOptions}
                          onCompleted={this.completeHandler}>
              <MDBRow>
                <MDBCol size={"12"} md={"6"}>
                  <Field
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

export default ProductAddPage;
