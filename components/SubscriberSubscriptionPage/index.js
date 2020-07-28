import React from "react";
import Loader from "../Loader";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {USER_SUBSCRIPTION_QUERY} from "./queries";
import {withRouter} from "next/router";
import {MDBCard, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import AdminCard from "../AdminCard";
import Link from "next/link";

class SubscriptionPage extends React.PureComponent {
  state = {
    copied: false
  }
  copyPaymentLink = paymentLink => {
    navigator.clipboard.writeText(paymentLink)
    this.setState({copied: true})
  }

  render() {
    const {data: {loading, error, userSubscription}} = this.props;
    if (loading)
      return <Loader/>
    if (error)
      return <h1>ERROR {error.message}</h1>
    if (!userSubscription) {
      // TODO: redirect to 404 page
      return (
        <MDBContainer>
          <h1>No Subscription Found</h1>
        </MDBContainer>
      )
    }
    const {subscription: {id, name}, balance} = userSubscription;

    const paymentUrl = `/subscriber/subscriptions/${id}/pay`

    return (
      <MDBContainer className={"py-3 px-3"}>
        <h1>{name}</h1>
        <MDBRow className={"px-3"}>
          <MDBCol size={"12"} md={"6"} className={"mb-3"}>
            <AdminCard iconClass={"fa-coins"} title={"Subscription Balance"} value={`Ksh.${balance}`}/>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} className={"my-3"}>
            <MDBCard className={"h-100 p-3"} style={{borderRadius: "1rem"}}>
              <MDBCardTitle>Pay for Subscription</MDBCardTitle>
              <Link href={`/subscriber/subscriptions/[subscriptionId]/pay`} as={paymentUrl}>
                <a className={"btn btn-default btn-lg rounded-pill my-3"}>
                  <MDBIcon icon={"money-bill"} className={"mx-3"}/>
                  PAY NOW
                </a>
              </Link>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default withRouter(
  compose(
    graphql(USER_SUBSCRIPTION_QUERY, {
      options: (props) => {
        const {subscriptionId} = props.router.query;
        return {
          variables: {subscriptionId}
        }
      }
    })
  )(SubscriptionPage)
)