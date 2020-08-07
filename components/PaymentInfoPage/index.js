import React from "react";
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {PAYMENT_INFO_MUTATION, PAYMENT_INFO_QUERY} from "./queries";
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {NextSeo} from "next-seo";
import {redirect} from "../app/components";

class PaymentInfoPage extends React.PureComponent {
  state = {
    paybillNumber: "",
    paybillAccount: "",
    errors: [],
    submitted: false
  }
  getData = () => {
    const {paybillAccount, paybillNumber} = this.state;
    let {data: {paymentInfo}} = this.props;
    if (!paymentInfo) paymentInfo = {}
    return {
      paybillAccount: paybillAccount ? paybillAccount : paymentInfo.paybillAccount,
      paybillNumber: paybillNumber ? paybillNumber : paymentInfo.paybillNumber
    }
  }
  completeHandler = ({data: {editPaymentInfo: {paymentInfo, errors}}}) => {
    if (paymentInfo) {
      return redirect('/member/account');
    }
    this.setState({errors: errors})
  }

  changeHandler = (object) => {
    this.setState(object)
  }

  render() {
    const {data: {loading, error, paymentInfo = {}}} = this.props
    if (loading) return <Loader/>

    if (error) return <h1>{error.message}</h1>

    const {submitted, errors} = this.state
    let createAlert = null;
    if (!paymentInfo)
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
        <NextSeo title={"Payment Info"}/>
        <MDBContainer>
          <MutationForm mutation={PAYMENT_INFO_MUTATION} data={this.getData()} onCompleted={this.completeHandler}>
            <h1>Subscription Payment Information</h1>
            <MDBRow center>
              {createAlert}
              <MDBCol size={"11"} md={"5"}>
                <Field
                  submitted={submitted}
                  initial={paymentInfo ? paymentInfo.paybillNumber : ""}
                  label={"Business Paybill Number"}
                  required
                  fieldErrors={errors.paybillNumber}
                  onChange={e => this.changeHandler({paybillNumber: e.target.value})}
                />
              </MDBCol>
              <MDBCol size={"11"} md={"5"}>
                <Field
                  submitted={submitted}
                  initial={paymentInfo ? paymentInfo.paybillAccount : ""}
                  label={"Business Account Number"}
                  required
                  fieldErrors={errors.paybillAccount}
                  onChange={e => this.changeHandler({paybillAccount: e.target.value})}
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

export default graphql(PAYMENT_INFO_QUERY)(PaymentInfoPage);