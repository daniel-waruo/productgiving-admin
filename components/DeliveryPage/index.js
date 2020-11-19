import React from "react";
import {MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {DELIVERY_QUERY} from "./queries";
import {withRouter} from "next/router";
import Loader from "../Loader";
import {NextSeo} from "next-seo";
import ProductsSection from "./components/ProductsSection";
import DeliveryStatusSection from "./components/DeliveryStatusSection";
import NextStageButton from "./components/NextStageButton";

class DeliveryPage extends React.PureComponent {

  render() {
    const {data: {loading, error, campaign}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;
    if (!campaign) return <h1>No Such Campaign</h1>

    return (
      <>
        <NextSeo title={campaign.name}/>

        <MDBAnimation type={"fadeIn"}>
          <MDBContainer className={"py-3 px-3"} fluid>
            <div className={"text-center"}>
            <h1>{campaign.name}</h1>
            <p className={"text-muted"}>{campaign.description}</p>
            </div>
            <MDBContainer fluid>
              <MDBRow center>
                <MDBCol size={"12"} className={"px-3 mt-2"}>
                  <DeliveryStatusSection state={campaign.delivery.state}/>
                </MDBCol>
                <MDBCol size={"12"} className={"px-3 mt-2"}>
                  <NextStageButton campaignId={campaign.id}/>
                </MDBCol>
                <MDBCol size={"12"} className={"px-3 mt-2"}>
                  <ProductsSection campaign={campaign}/>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBContainer>
        </MDBAnimation>
      </>
    )
  }
}

export default withRouter(compose(
  graphql(DELIVERY_QUERY, {
    options: (props) => {
      const {id} = props.router.query;
      return {
        variables: {id}
      }
    }
  }),
  )(DeliveryPage)
)