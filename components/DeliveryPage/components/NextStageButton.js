import React from "react";
import {MDBBtn, MDBIcon} from "mdbreact";
import {DELIVERY_QUERY, NEXT_DELIVERY_STATE_MUTATION} from "../queries";
import {graphql} from "react-apollo";
import {DELIVERY_LIST_QUERY} from "../../DeliveryListPage/queries";

class NextStageButton extends React.PureComponent {
  nextDeliveryState = () => {
    this.props.nextDeliveryState({
      refetchQueries: [
        {
          query: DELIVERY_LIST_QUERY
        },
        {
          query: DELIVERY_QUERY,
          variables:{
            id: this.props.campaignId
          }
        }
      ],
      variables: {
        id: this.props.campaignId
      }
    })
  }
  render() {
    return (
      <MDBBtn
        onClick={this.nextDeliveryState}
        color={"light-green"}
        className={"rounded-pill"}>
        NEXT STAGE
        <MDBIcon icon={"arrow-right"}/>
      </MDBBtn>
    )
  }
}

export default graphql(NEXT_DELIVERY_STATE_MUTATION, {name: "nextDeliveryState"})(NextStageButton)