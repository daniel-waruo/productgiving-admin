import React from 'react'
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import {graphql} from 'react-apollo'
import {PAYMENT_STATUS_SUBSCRIPTION} from "../queries";

class PaymentPending extends React.PureComponent {

  render() {
    const {data: {error, loading, transaction}} = this.props
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
        <MDBRow center>
          <MDBCol size={"10"} md={"6"} className={"text-center"}>
            <MDBAnimation type={"bounce"}>
              <MDBAlert color={"danger"} className={"z-depth-1 rounded"}>
                {reasonFailed}
              </MDBAlert>
            </MDBAnimation>
            <MDBBtn onClick={() => this.props.nextStep('login')}>
              <MDBIcon icon={"redo-alt"} className={"mx-2"}/>
              RETRY
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      )
    return (
      <MDBRow center>
        <MDBCol size={"10"} md={"6"}>
          <MDBAnimation type={"bounce"}>
            <MDBAlert color={"success"} className={"z-depth-1 rounded"}>
              Subscription paid successfully
            </MDBAlert>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    )
  }

}

PaymentPending.propTypes = {
  transactionId: PropTypes.string,
  nextStep: PropTypes.func
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