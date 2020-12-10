import React from "react";
import {MDBBtn,MDBIcon, MDBCol, MDBContainer, MDBRow,MDBCardImage} from "mdbreact";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {APPROVE_CAMPAIGN_MUTATION, CAMPAIGN_QUERY, DISAPPROVE_CAMPAIGN_MUTATION,SET_FEATURED_MUTATION} from "./queries";
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
  addFeatured = () => {
    const {data: {campaign}} = this.props;
    this.props.setFeatured({
      variables: {
        id: campaign.id,
        isFeatured:true
      }
    })
  }

  removeFeatured = () => {
    const {data: {campaign}} = this.props;
    this.props.setFeatured({
      variables: {
        id: campaign.id,
        isFeatured:false
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
            <MDBCardImage
              src={campaign.image + "-/resize/400x200/"}
              overlay={"green-light"}
              className={"img-fluid w-100"}
              style={{borderRadius: "1rem",}}/>
          </MDBCol>
          <MDBCol size={"12"} md={"5"}>
            <MDBContainer >
              <h1 className={"text-capitalize"}>{campaign.name}</h1>
              <p className={"text-muted"}>
                {campaign.description}
              </p>
              <h2>Owner Information</h2>
              <div className="ml-3">
                <p className={"pr-4"}>
                  <MDBIcon icon="user" className="mr-2 text-muted"/>
                  {`${owner.firstName} ${owner.lastName}`}
                </p>
                <p className={"pr-4"}>
                  <MDBIcon icon="envelope" className="mr-2 text-muted"/>
                  {owner.email}</p>
                <p className={"pr-4"}>
                  <MDBIcon icon="phone" className="mr-2 text-muted"/>
                  {owner.phone ? owner.phone : "N/A"}
                </p>
              </div>
              <div className={"text-center"}>
                {
                  campaign.isApproved ?
                    <MDBBtn
                      outline
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
              </div>
              <div className={"text-center"}>
                {
                  campaign.isFeatured ?
                    <MDBBtn
                      outline
                      onClick={() => this.removeFeatured()}
                      color={"danger"}
                      className={"rounded-pill text-center"}>
                      Remove Featured
                    </MDBBtn>
                    :
                    <MDBBtn
                      onClick={() => this.addFeatured()}
                      color={"light-green"}
                      className={"rounded-pill text-center"}>
                      Add Featured
                    </MDBBtn>
                }
              </div>

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
        return {variables: {id}}
      }
    }),
    graphql(APPROVE_CAMPAIGN_MUTATION, {name: "approveCampaign"}),
    graphql(DISAPPROVE_CAMPAIGN_MUTATION, {name: "disapproveCampaign"}),
    graphql(SET_FEATURED_MUTATION, {name: "setFeatured"}),
  )(CampaignPage)
)
