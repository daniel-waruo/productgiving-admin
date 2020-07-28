import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import PropTypes from "prop-types";
import compose from 'lodash.flowright'
import {graphql} from "react-apollo";
import {SUBSCRIPTION_PAYMENT_MUTATION} from "../queries";
import PaymentPending from "./PaymentPending";
import Loader from "../../Loader";

class PaymentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      loading: false,
      errors: [],
      paymentPending: false,
      transactionId: null
    }
    this.defaultState = this.state
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({loading: true})
    if (this.state.errors.length) return
    const {subscription: {id}, amount} = this.props;
    this.props.paySubscription({
        variables: {
          phone: this.state.phone,
          amount,
          subscriptionId: id
        }
      }
    ).then(
      ({data: {paySubscription: {errors, transaction, paymentPending}}}) => {
        if (errors) {
          let allErrors = []
          errors.forEach(({errors}) => allErrors.push(...errors))
          this.setState({errors: allErrors, loading: false})
          return
        }
        if (paymentPending) {
          this.setState({
            paymentPending: true,
            transactionId: transaction.id
          })
        }
      }
    )
  }
  changeHandler = ({target: {value}}) => {
    const pattern = /^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/
    if (pattern.test(value)) {
      const finishedPhone = "+254" + value.slice(1)
      this.props.onChange({phone: finishedPhone})
      this.setState({phone: finishedPhone, errors: []});
      return
    }
    this.setState({phone: value, errors: ['Invalid Phone Number']});
  }

  nextStep = () => {
    this.setState(this.defaultState)
    return this.props.nextStep
  }

  render() {
    const {errors, paymentPending} = this.state;

    if (paymentPending)
      return <PaymentPending nextStep={this.nextStep} transactionId={this.state.transactionId}/>
    const inputErrors = errors.map(
      (error, key) => (
        <div key={key} className="invalid-feedback">
          {error}
        </div>
      )
    )
    const invalidClass = errors.length && this.state.phone ? "is-invalid" : "";
    const validClass = !errors.length && this.state.phone ? "is-valid" : "";


    return (
      <form onSubmit={this.submitHandler}>
        <p>
          Input the phone number which you will use to pay the money .e.g 07xxxxxxxx
        </p>
        <MDBRow>
          <MDBCol size={"12"} md={"10"}>
            <MDBRow center>
              <MDBCol size={"11"} md={"6"}>
                {this.state.loading ? <Loader/> : null}
                <MDBInput
                  type={"text"}
                  required
                  disabled={this.state.loading}
                  label={"Enter Your phone number"}
                  onChange={this.changeHandler}
                  className={validClass + " " + invalidClass}
                >
                  {inputErrors}
                  <div className={"valid-feedback"}>Valid Phone Number!!</div>
                </MDBInput>

              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"} md={"6"} className={"text-center"}>
                <MDBBtn className={"rounded-pill"} type={"submit"}
                        disabled={this.state.loading || validClass === ""}>
                  <MDBIcon icon={"money-bill"} className={"mx-2 rounded-pill"}/>
                  PAY
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }

}


PaymentForm.propTypes = {
  subscription: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired
}

export default compose(
  graphql(SUBSCRIPTION_PAYMENT_MUTATION, {name: 'paySubscription'})
)(PaymentForm)