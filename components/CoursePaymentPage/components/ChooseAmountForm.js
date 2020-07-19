import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow} from "mdbreact";
import PropTypes from "prop-types";

class ChooseAmountForm extends React.PureComponent {

  clickHandler = no => {
    const {subscription: {price}} = this.props;
    return () => {
      this.props.onChange({amount: (no * price).toString()})
      this.props.nextStep('finish')
    }
  }

  render() {
    const {subscription: {price}} = this.props;
    const weeks = [1, 2, 3, 4];
    const weekList = weeks.map(
      (no, key) => {
        return (
          <MDBListGroupItem key={key} className={"rounded border-0 my-2 z-depth-1"}>
            <span className={"mt-2"}>
              Ksh {price * no} for {no} week{no > 1 ? "s" : ""}
            </span>
            <MDBBtn
              onClick={this.clickHandler(no)}
              className={"rounded-pill float-right"}>
              SELECT
            </MDBBtn>
          </MDBListGroupItem>
        )
      }
    )
    return (
      <MDBRow center>
        <MDBCol size={"12"} md={"10"}>
          <MDBContainer>
            <MDBListGroup>
              {weekList}
            </MDBListGroup>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    )
  }

}


ChooseAmountForm.propTypes = {
  subscription: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func
}
export default ChooseAmountForm