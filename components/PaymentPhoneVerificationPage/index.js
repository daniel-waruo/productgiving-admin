import React from "react";
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Loader from "../Loader";
import {NextSeo} from "next-seo";
import {redirect} from "../app/components";
import {graphql} from "react-apollo";
import VerifyPaymentPhoneForm from "./VerifyPaymentPhoneForm";
import Link from "next/link";
import {PAYMENT_PROFILE_QUERY} from "../PaymentProfilePage/queries";
import ChangePaymentPhoneModal from "../PaymentProfilePage/ChangePaymentPhoneModal";

class PaymentPhoneVerificationPage extends React.PureComponent {
  state = {
    changePhone: {
      isOpen: false
    }
  }
  changePhoneToggle = () => {
    this.setState({
      changePhone: {
        isOpen: !this.state.changePhone.isOpen
      }
    })
  }

  render() {
    const {data: {loading, error, paymentProfile}} = this.props
    if (loading) return <Loader/>

    if (error) return <h1>{error.message}</h1>

    if (!paymentProfile)
      return redirect('/member/account/payment')

    if (paymentProfile.phoneVerified) {
      return (
        <MDBContainer className={"text-center"}>
          <h3>Phone Number Already Verified</h3>
          <Link href={'/member/account/payment'}>
            <a>
              <MDBBtn className={"rounded-pill mt-4"}>
                View Payment Profile
              </MDBBtn>
            </a>
          </Link>
        </MDBContainer>
      )
    }

    const {changePhone} = this.state;
    return (
      <>
        <NextSeo title={"Verify Payment Phone"}/>
        <MDBContainer>
          <h1 className={"mb-5"}>Verify Payment Phone</h1>
          <MDBRow center>
            <MDBCol size={"10"} md={"6"} className={"text-center"}>
              <ChangePaymentPhoneModal toggle={this.changePhoneToggle} isOpen={changePhone.isOpen}
                                       paymentProfile={paymentProfile}/>
              <MDBAnimation type={"bounceIn"}>
                <MDBAlert color={"info"} className={"z-depth-1"}>
                  Check your phone ({paymentProfile.phone}) for message from AFRIKAS TALKING
                  and enter the code below
                </MDBAlert>
              </MDBAnimation>
            </MDBCol>
            <MDBCol size={"12"}/>
            <MDBCol size={"12"} md={"7"} lg={"5"} className={"text-center"}>
              <VerifyPaymentPhoneForm paymentProfile={paymentProfile}/>
              <MDBBtn className={"rounded-pill mt-4"} onClick={this.changePhoneToggle}>
                Change Phone Number
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  }
}

export default graphql(PAYMENT_PROFILE_QUERY)(PaymentPhoneVerificationPage);