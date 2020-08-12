import React from "react";
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {PAYMENT_PROFILE_MUTATION, PAYMENT_PROFILE_QUERY} from "./queries";
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {NextSeo} from "next-seo";

class PaymentProfilePage extends React.PureComponent {
  state = {
    phone: "",
    errors: [],
    submitted: false
  }
  getData = () => {
    const {phone} = this.state;
    let {data: {paymentProfile = {}}} = this.props;
    if (!paymentProfile) paymentProfile = {};
    return {
      phone: paymentProfile ? phone : paymentProfile.phone
    }
  }
  completeHandler = ({data: {editPaymentProfile: {paymentProfile, errors}}}) => {
    if (paymentProfile) {
      alert("successfully created payment profile await for phone verification")

    }
    this.setState({errors: errors})
  }

  changeHandler = (object) => {
    this.setState(object)
  }

  render() {
    const {data: {loading, error, paymentProfile = {}}} = this.props
    if (loading) return <Loader/>

    if (error) return <h1>{error.message}</h1>

    const {submitted, errors} = this.state
    let createAlert = null;
    if (!paymentProfile)
      createAlert = (
        <>
          <MDBCol size={"10"} md={"6"}>
            <MDBAnimation type={"bounceIn"}>
              <MDBAlert color={"danger"} className={"z-depth-1"}>
                Add Payment Details
              </MDBAlert>
            </MDBAnimation>
          </MDBCol>
          <MDBCol size={"12"}/>
        </>
      )
    return (
      <>
        <NextSeo title={"Payment Profile"}/>
        <MDBContainer>
          <MutationForm mutation={PAYMENT_PROFILE_MUTATION} data={this.getData()} onCompleted={this.completeHandler}>
            <h1>Payment Profile</h1>
            <MDBRow center>
              {createAlert}
              <MDBCol size={"11"} md={"5"}>
                <Field
                  submitted={submitted}
                  initial={paymentProfile ? paymentProfile.phone : ""}
                  label={"Phone Number"}
                  required
                  fieldErrors={errors.phone}
                  onChange={e => this.changeHandler({phone: e.target.value})}
                />
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"6"} className={"text-center"}>
                <MDBBtn type={"submit"} size={"lg"} className={"rounded-pill"}>
                  SUBMIT
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MutationForm>
        </MDBContainer>
      </>
    )
  }
}

export default graphql(PAYMENT_PROFILE_QUERY)(PaymentProfilePage);