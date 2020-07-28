import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import SubscriptionCard from "./SubscriptionCard";
import PropTypes from 'prop-types'
import Link from "next/link";

class SubscriptionListSection extends React.PureComponent {

  render() {
    const {subscriptions} = this.props;
    //list of the courses
    const subscriptionsList = subscriptions ? subscriptions.map(
      ({id, name, description,price}, key) => (
        <MDBCol key={key} size={"12"} md={"4"} className={"my-2"}>
          <SubscriptionCard title={name}>
            {description}<br/>
            <p className={"bold-text black-text"}>CHARGING : @{price} weekly</p>
            <div className={"w-100 text-center"}>
              <Link href={'/subscriber/subscriptions/[subscriptionId]'} as={`/subscriber/subscriptions/${id}`}>
                <a className={"btn btn-default rounded-pill mt-1 mb-1"}>SUBSCRIBE</a>
              </Link>
            </div>
          </SubscriptionCard>
        </MDBCol>
      )
    ) : null
    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBRow center>
            <MDBCol size={"12"}>
              <MDBRow>
                {subscriptionsList}
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  };
}

SubscriptionListSection.propTypes = {
  subscriptions: PropTypes.array
}
export default SubscriptionListSection