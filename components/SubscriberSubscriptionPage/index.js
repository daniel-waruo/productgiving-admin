import React from "react";
import Loader from "../Loader";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {USER_SUBSCRIPTION_QUERY} from "./queries";
import {withRouter} from "next/router";
import {MDBBtn, MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import Link from "next/link";
import NotSubscribedSection from "./NotSubscribedSection";

class SubscriptionPage extends React.PureComponent {
  state = {
    copied: false
  }
  copyPaymentLink = paymentLink => {
    navigator.clipboard.writeText(paymentLink)
    this.setState({copied: true})
  }

  render() {
    const {data: {loading, error, subscription, userSubscription}} = this.props;
    if (loading)
      return <Loader/>
    if (error)
      return <h1>ERROR {error.message}</h1>
    if (!subscription) {
      // TODO: redirect to 404 page
      return (
        <MDBContainer>
          <h1>No Subscription Found</h1>
        </MDBContainer>
      )
    }

    if (!userSubscription) {
      return <NotSubscribedSection subscription={subscription}/>
    }
    let {expiryDate} = userSubscription;
    const {id, name} = subscription;
    const paymentUrl = `/subscriber/subscriptions/${id}/pay`
    const date = new Date(expiryDate);
    expiryDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric"
    }).format(date)
    return (
      <MDBContainer className={"py-3 px-3"}>
        <h1>{name}</h1>
        <MDBRow className={"px-3"}>
          <MDBCol size={"12"} md={"6"} className={"mb-3"}>
            <MDBCard className={"my-3 h-100 p-3"} role={"button"} style={{borderRadius: "1rem"}}>
              <MDBRow>
                <MDBCol size={"12"}>
                  <MDBCardTitle className={"pl-2 pb-2 border-bottom mb-3"}>
                    <MDBIcon icon={"clock"} className={"mx-2"}/> Valid Until
                  </MDBCardTitle>
                </MDBCol>
                <MDBCol size={"12"}>
                  <MDBCardText tag={"span"} className={"float-right mt-3"} style={{fontSize: "1.5rem"}}>
                    {expiryDate}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} className={"my-3"}>
            <MDBCard className={"h-100 p-3"} style={{borderRadius: "1rem"}}>
              <MDBCardTitle>Pay for Subscription</MDBCardTitle>
              <Link href={`/subscriber/subscriptions/[subscriptionId]/pay`} as={paymentUrl}>
                <a>
                  <MDBBtn outline size={"lg"} tag={'span'} className={"rounded-pill my-3"}>
                    <MDBIcon icon={"money-bill"} className={"mx-3"}/>
                    PAY NOW
                  </MDBBtn>
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