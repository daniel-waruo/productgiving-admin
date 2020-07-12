import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import PropTypes from "prop-types";

class PaymentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      loading: false
    }
  }

  submitHandler = event => {
    event.preventDefault();
  }
  changeHandler = value => {
    this.setState({phone: value})
    this.props.onChange({phone: value})
  }

  render() {
    const {subscription: {id, name, price}, amount} = this.props;

    return (
      <form onSubmit={this.submitHandler}>
        <MDBRow>
          <MDBCol size={"12"} md={"10"}>
            <MDBRow center>
              <MDBCol size={"11"} md={"6"}>
                <MDBInput
                  type={"text"}
                  required
                  disabled={this.state.loading}
                  value={this.state.phone}
                  label={"Enter Your phone number"}
                  onChange={this.changeHandler}
                />
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"} md={"6"} className={"text-center"}>
                <MDBBtn className={"rounded-pill"} type={"submit"} disabled={this.state.loading}>
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
  onChange: PropTypes.func.isRequired
}
export default PaymentForm