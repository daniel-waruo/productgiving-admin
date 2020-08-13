import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import Loader from "../../Loader";
import {APP_QUERY} from "../../app/queries";
import AdminCard from "../../AdminCard";
import RevenueChart from "./RevenueChart";
import compose from "lodash.flowright";
import {MEMBER_HOME_QUERY} from "../queries";

class HomeUserPage extends React.Component {

  render() {
    const {
      data: {loading, error, wallet, totalEarnings, totalSubscribers}
    } = this.props;
    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return null;

    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBContainer fluid>
            <MDBRow center>
              <MDBCol size={"12"} sm={"6"} lg={"4"} className={"my-2"}>
                <AdminCard
                  title={"Total Subscribers"}
                  iconClass={"fa-user"}
                  value={totalSubscribers}/>
              </MDBCol>
              <MDBCol size={"12"} sm={"6"} lg={"4"} className={"my-2"}>
                <AdminCard
                  title={"Total Earnings (Ksh)"}
                  iconClass={"fa-money-bill"}
                  value={totalEarnings.toString()}/>
              </MDBCol>
              <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                <AdminCard
                  title={"Wallet Balance (Ksh)"}
                  iconClass={"fas fa-money-bag"}
                  value={wallet.balance.toString()}/>
              </MDBCol>
            </MDBRow>
            <RevenueChart/>
          </MDBContainer>
        </MDBContainer>
      </>
    )
  };
}

export default compose(
  graphql(APP_QUERY),
  graphql(MEMBER_HOME_QUERY)
)(HomeUserPage);