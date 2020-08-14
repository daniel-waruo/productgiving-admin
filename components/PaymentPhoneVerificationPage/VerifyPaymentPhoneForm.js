import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {PHONE_VERIFICATION_MUTATION} from "./queries";
import {Field} from "../FIeld";
import {format_errors} from "../../_helpers";
import PropTypes from "prop-types"
import {redirect} from "../app/components";
import {PAYMENT_PROFILE_QUERY} from "../PaymentProfilePage/queries";

class VerifyPaymentPhoneForm extends React.PureComponent {
  state = {
    code: "",
    errors: {},
    submitted: false
  }
  getData = () => {
    const {code} = this.state;
    return {code}
  }
  completeHandler = ({verifyPaymentPhone: {paymentProfile, errors}}) => {
    if (paymentProfile) {
      return redirect('/member/account/payment')
    }
    this.setState({errors: format_errors(errors), submitted: true})
  }

  changeHandler = ({target: {value}}) => {
    this.setState({code: value});
  }
  mutationOptions = {
    refetchQueries: [{query: PAYMENT_PROFILE_QUERY}]
  };

  render() {
    const {paymentProfile} = this.props;
    const {submitted, errors} = this.state;

    return (
      <>
        <MDBContainer className={"text-center"}>
          <MutationForm
            mutation={PHONE_VERIFICATION_MUTATION}
            data={this.getData()}
            mutationOptions={this.mutationOptions}
            onCompleted={this.completeHandler}>
            <MDBRow center>
              <MDBCol size={"11"}>
                <Field
                  submitted={submitted}
                  label={"Verification Code"}
                  required
                  fieldErrors={errors.code}
                  onChange={this.changeHandler}
                />
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"6"} className={"text-center"}>
                <MDBBtn type={"submit"} className={"rounded-pill"}>
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

VerifyPaymentPhoneForm.propTypes = {
  paymentProfile: PropTypes.object.isRequired
}

export default VerifyPaymentPhoneForm