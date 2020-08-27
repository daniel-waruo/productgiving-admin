import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import compose from 'lodash.flowright'
import {graphql} from "react-apollo";
import PaymentPending from "../SubscriptionPaymentPage/components/PaymentPending";
import Loader from "../Loader";
import {PLAN_PAYMENT_MUTATION} from "./queries";

class PlanPaymentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      monthsNo: 1,
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
    const {plan} = this.props;
    this.props.payMemberPlan({
        variables: {
          phone: this.state.phone,
          monthsNo: this.state.monthsNo,
          plan:plan
        }
      }
    ).then(
      ({data: {payMemberPlan: {errors, transaction, paymentPending}}}) => {
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
  phoneChangeHandler = ({target: {value}}) => {
    const pattern = /^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
    if (pattern.test(value)) {
      const finishedPhone = "+254" + value.slice(1);
      this.setState({phone: finishedPhone, errors: []});
      return ;
    }
    this.setState({phone: value, errors: ['Invalid Phone Number']});
  }
  monthsChangeHandler = ({target: {value}}) => {
    this.setState({monthsNo: value})
  }

  render() {
    const {errors, paymentPending} = this.state;

    if (paymentPending)
      return <PaymentPending nextStep={() => null} transactionId={this.state.transactionId}/>
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
        <MDBRow>
          <MDBCol size={"12"} md={"10"}>
            <MDBRow center>
              <MDBCol size={"11"} md={"6"}>
                {this.state.loading ? <Loader/> : null}
                <MDBInput
                  type={"number"}
                  required
                  min={"1"}
                  step={"1"}
                  valueDefault={"1"}
                  disabled={this.state.loading}
                  label={"Number of Months"}
                  onChange={this.monthsChangeHandler}
                >
                </MDBInput>
                <p className={"text-center"}>
                  Input the M-PESA phone number which you will use to pay the money .e.g 07xxxxxxxx
                </p>
                <MDBInput
                  type={"text"}
                  required
                  disabled={this.state.loading}
                  label={"phone number"}
                  onChange={this.phoneChangeHandler}
                  className={validClass + " " + invalidClass}
                >
                  {inputErrors}
                  <div className={"valid-feedback"}>Valid Phone Number!!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"} md={"6"} className={"text-center"}>
                <MDBBtn className={"rounded-pill"} type={"submit"}
                        disabled={this.state.loading || invalidClass}>
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

export default compose(
  graphql(PLAN_PAYMENT_MUTATION, {name: 'payMemberPlan'})
)(PlanPaymentForm)