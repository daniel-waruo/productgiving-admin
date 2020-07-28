import React from "react";
import {MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import PropTypes from "prop-types";
import {WithdrawForm} from "./WithdrawForm";
import {WITHDRAW_MUTATION} from "./queries";

class WithdrawModal extends React.PureComponent {


  render() {
    const {toggle, isOpen, balance, paybillAccount, paybillNumber} = this.props;
    return (
      <MDBModal isOpen={isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Withdraw</MDBModalHeader>
        <MDBModalBody>
          <p>The money will be transferred to your saved paybill information</p>
          <p className={"text-bold"}> PAYBILL NUMBER : {paybillNumber}</p>
          <p className={"text-bold"}> PAYBILL NUMBER : {paybillAccount}</p>
          <WithdrawForm balance={balance} mutation={WITHDRAW_MUTATION} />
        </MDBModalBody>
      </MDBModal>
    );
  }
}

WithdrawModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  balance: PropTypes.number.isRequired,
  paybillNumber: PropTypes.string.isRequired,
  paybillAccount: PropTypes.string.isRequired
}
export default WithdrawModal