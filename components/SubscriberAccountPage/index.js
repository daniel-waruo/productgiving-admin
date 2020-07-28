import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import {USER_QUERY} from "./queries";
import Loader from "../Loader";
import {AccountCard} from "../AccountPage";


class AccountPage extends React.Component {

  render() {
    const {data: {loading, error, user, paymentInfo}} = this.props;

    if (loading) return <Loader/>;
    // if error  return null
    //TODO:create an error page
    if (error) return <h1>{error.message}</h1>;

    const {email, firstName, lastName} = user;

    const fullName = `${firstName} ${lastName}`;
    const {paybillNumber, paybillAccount} = paymentInfo;

    return (
      <MDBContainer>
        <h1 className={"text-bold"}>Account Overview</h1>
        <MDBRow>
          <MDBCol size={"12"} md={"6"} className={"my-3"}>
            <AccountCard href={"/subscriber/account/profile"} title={"User Profile"} className={"z-depth-half m-2 h-100"}>
              <p className={"px-2 h5 text-capitalize"}>{fullName}</p>
              <p className={"px-2"}>{email}</p>
            </AccountCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  };
}

export default graphql(
  USER_QUERY
)(AccountPage);