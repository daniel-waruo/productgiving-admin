import React from 'react'
import {MDBAnimation, MDBCard, MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import Loader from "../Loader";
import AdminCard from "../AdminCard";
import RevenueChart from "./components/RevenueChart";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {APP_QUERY} from "../App/queries";
import VisitorChart from "./components/VisitorChart";
import {NextSeo} from "next-seo"

class HomeUserPage extends React.Component {

  render() {
    const {data: {loading, error}} = this.props;
    if (loading) return <Loader/>;
    // if error  return null
    //TODO:create an error page
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
                      value={"90"}/>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                  <MDBAnimation type={"fadeInUp"} className={"h-100"}>
                    <AdminCard
                      title={"Total Visitors"}
                      iconClass={"fa-money-bill"}
                      value={"82"}/>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                  <MDBAnimation type={"fadeInRight"} className={"h-100"}>
                    <AdminCard
                      title={"Amount Donated"}
                      icon={"wallet"}
                      value={"Ksh.100023"}/>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol size={"12"}>
                  <MDBCard className={"mb-2 mt-4"} style={{borderRadius: "1rem"}}>
                    <RevenueChart />
                  </MDBCard>
                </MDBCol>
                <MDBCol size={"12"}>
                  <MDBCard className={"mb-2 mt-4"} style={{borderRadius: "1rem"}}>
                    <VisitorChart />
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
  //graphql(REVENUE_DATA_QUERY),
  graphql(APP_QUERY),
  //graphql(MEMBER_HOME_QUERY),
)(HomeUserPage);