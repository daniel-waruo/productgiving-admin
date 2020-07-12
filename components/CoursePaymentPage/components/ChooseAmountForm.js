import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import PropTypes from "prop-types";

class PaymentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.subscription.price,
      loading: false
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.nextStep('finish')
  }

  changeHandler = e => {
    this.setState({amount: e.target.value})
    this.props.onChange({amount: e.target.value})
  }

  render() {
    const {subscription: {id, price}} = this.props;
    return (
      <form onSubmit={this.submitHandler}>
        <MDBRow>
          <MDBCol size={"12"} md={"10"}>
            <MDBRow center>
              <MDBCol size={"11"} md={"6"}>
                <MDBInput
                  min={price}
                  type={"number"}
                  required
                  valueDefault={price}
                  disabled={this.state.loading}
                  label={"Amount you want to pay in Kenya shillings"}
                  onChange={this.changeHandler}
                />
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"} md={"6"} className={"text-center"}>
                <MDBBtn className={"rounded-pill"} type={"submit"} disabled={this.state.loading}>
                  <MDBIcon icon={"money"} className={"mx-2 rounded-pill"}/>
                  SUBMIT AMOUNT
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
  nextStep: PropTypes.func
}
export default PaymentForm