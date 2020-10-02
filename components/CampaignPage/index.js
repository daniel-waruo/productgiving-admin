import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {APPROVE_CAMPAIGN_MUTATION, CAMPAIGN_QUERY, DISAPPROVE_CAMPAIGN_MUTATION} from "./queries";
import {withRouter} from "next/router";
import Loader from "../Loader";

class CampaignPage extends React.PureComponent {

  approveCampaign = () => {
    const {data: {campaign}} = this.props;
    this.props.approveCampaign({
      variables: {
        id: campaign.id
      }
    })
  }

  disapproveCampaign = () => {
    const {data: {campaign}} = this.props;
    this.props.disapproveCampaign({
      variables: {
        id: campaign.id
      }
    })
  }
  render() {
    const {data: {loading, error, campaign}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;
    if (!campaign) return <h1>No Such Campaign</h1>;
    const {owner} = campaign;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol size={"12"} md={"7"}>
            <img
              alt={"campaign image"}
              src={`${campaign.image}-/resize/500x300/`}
              className={"img-fluid"}/>
          </MDBCol>
          <MDBCol size={"12"} md={"5"}>
            <MDBContainer>
              <h1 className={"text-capitalize"}>{campaign.name}</h1>
              <p className={"text-muted"}>
                {campaign.description}
              </p>
              <h2>Owner Information</h2>
              <p>NAME - {`${owner.firstName} ${owner.lastName}`}</p>
              <p>EMAIL - {owner.email}</p>
              <p>PHONE-NUMBER - {owner.phone ? owner.phone : "N/A"}</p>
              {
                campaign.isApproved ?
                  <MDBBtn
                    onClick={() => this.disapproveCampaign()}
                    color={"danger"}
                    className={"rounded-pill text-center"}>
                    DIS-APPROVE CAMPAIGN
                  </MDBBtn>
                  :
                  <MDBBtn
                    onClick={() => this.approveCampaign()}
                    color={"light-green"}
                    className={"rounded-pill text-center"}>
                    APPROVE CAMPAIGN
                  </MDBBtn>
              }
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}


export default withRouter(
  compose(
    graphql(CAMPAIGN_QUERY, {
      options: (props) => {
        const {id} = props.router.query;
        return {
          variables: {id}
        }
      }
    }),
    graphql(APPROVE_CAMPAIGN_MUTATION, {name: "approveCampaign"}),
    graphql(DISAPPROVE_CAMPAIGN_MUTATION, {name: "disapproveCampaign"}),
  )(CampaignPage)
)
