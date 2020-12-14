import React from 'react'
import {MDBAnimation, MDBCard, MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import Loader from "../Loader";
import AdminCard from "../AdminCard";
import RevenueChart from "./components/RevenueChart";
import DonationsChart from "./components/DonationsChart";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {NextSeo} from "next-seo"
import {HOME_QUERY} from "./queries"

class HomePage extends React.Component {

  render() {
    const {data: {
      loading, error, donationsByDate, incomeByDate,
      totalIncome,totalDonated,totalActiveCampaigns
    }} = this.props;
    if (loading) return <Loader fullScreen />;
    if (error) return <h1>{error.message}</h1>;

    return (
      <>
        <NextSeo title={"Home"}/>
        <MDBAnimation type={"fadeIn"}>
          <MDBContainer className={"py-3 px-3"} fluid>
            <MDBContainer fluid>
              <MDBRow center>
                <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                  <MDBAnimation type={"fadeInDown"} delay={"2"} className={"h-100"}>
                    <AdminCard
                      title={"Total Donations"}
                      iconClass={"fa-user"}
                      value={totalDonated}/>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                  <MDBAnimation type={"fadeInUp"} className={"h-100"}>
                    <AdminCard
                      title={"Active Campaigns"}
                      iconClass={"fa-money-bill"}
                      value={totalActiveCampaigns}/>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                  <MDBAnimation type={"fadeInRight"} className={"h-100"}>
                    <AdminCard
                      title={"Amount Donated"}
                      icon={"wallet"}
                      value={`Ksh.${totalIncome}`}/>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol size={"12"}>
                  <MDBCard className={"mb-2 mt-4"} style={{borderRadius: "1rem"}}>
                    <DonationsChart donationsByDate={donationsByDate}/>
                  </MDBCard>
                </MDBCol>
                <MDBCol size={"12"}>
                  <MDBCard className={"mb-2 mt-4"} style={{borderRadius: "1rem"}}>
                    <RevenueChart incomeByDate={incomeByDate} />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBContainer>
        </MDBAnimation>
      </>
    )
  };
}

export default compose(
  graphql(HOME_QUERY)
)(HomePage);
