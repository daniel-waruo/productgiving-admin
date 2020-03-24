import React from 'react'
import {AccountCard, redirectNoUser} from './components'
import {MDBCol, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import {userQuery} from "./queries";
import SpinnerLoader from "../global/loaders/spinnerLoader";

class Account extends React.Component {

  render() {
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props;
    if (loading) return <SpinnerLoader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return null;

    // if user is null redirect to login page
    if (!user) return redirectNoUser();

    const {email, firstName, lastName} = user;
    const fullName = `${firstName} ${lastName}`;

    return (
      <>
        <h1 className={"text-center text-bold"}>Account Overview</h1>
        <MDBRow center>
          <MDBCol size={"12"} md={"6"} className={"my-3"}>
            <AccountCard href={"/account/edit"} title={"User Details"} className={"z-depth-half m-2 h-100"}>
              <p className={"px-2 h5"}>{fullName}</p>
              <p className={"px-2"}>{email}</p>
            </AccountCard>
          </MDBCol>
        </MDBRow>
      </>
    )
  };
}

export default graphql(
  userQuery
)(Account);