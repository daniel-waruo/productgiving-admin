import React from 'react'
import {MDBAlert, MDBContainer} from "mdbreact";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import {graphql} from 'react-apollo'
import {PAYMENT_STATUS_SUBSCRIPTION} from "../queries";

class PaymentPending extends React.PureComponent {
  render() {
    const {data:{error, loading, transaction}} = this.props
    if (error) {
      return <h1>{error.message}</h1>
    }
    if (loading) {
      return (
        <MDBContainer>
          <h3 className={"my-3"}>Waiting for user to accept payment</h3>
          <Loader/>
        </MDBContainer>
      )
    }
    const {successStatus, reasonFailed} = transaction;

    if (!successStatus)
      return (
        <>
          <MDBAlert color={"danger"}>
            Subscription Payment Failed
          </MDBAlert>
          {reasonFailed}
        </>
      )
    return (
      <MDBAlert color={"success"}>
        Subscription paid successfully
      </MDBAlert>
    )
  }

}

PaymentPending.propTypes = {
  transactionId: PropTypes.string
}
export default graphql(
  PAYMENT_STATUS_SUBSCRIPTION, {
    options: (props) => {
      const {transactionId} = props;
      return {
        variables: {transactionId}
      }
    }
  }
)(PaymentPending);