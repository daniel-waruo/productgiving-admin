import React from 'react'
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import {USER_QUERY} from "./queries";
import Loader from "../Loader";
import Link from "next/link";
import {NextSeo} from "next-seo";


export function AccountCard(props) {
  const {title, className, href, icon} = props;

  return (
    <MDBCard className={className} style={{borderRadius: "1rem"}}>
      <MDBCardBody>
        <MDBCardTitle className={"pl-2 pb-2 border-bottom border-dark"}>
          {title}
          <Link href={href}>
            <a className={"btn btn-white btn-lg float-right text-primary p-3 rounded fa fa-edit"}/>
          </Link>
        </MDBCardTitle>
        <MDBCardText tag={"div"}>
          {props.children}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

class AccountPage extends React.Component {

  render() {
    const {data: {loading, error, user, paymentProfile, memberProfile}} = this.props;

    if (loading) return <Loader/>;
    // if error  return null
    //TODO:create an error page
    if (error) return <h1>{error.message}</h1>;
    const {email, firstName, lastName} = user;
    const fullName = `${firstName} ${lastName}`;
    return (
      <>
        <NextSeo title={"Account"}/>
        <MDBContainer>
          <h1 className={"text-bold"}>Account Overview</h1>
          <MDBRow>
            <MDBCol size={"12"} md={"6"} className={"my-3"}>
              <AccountCard href={"/account/profile"} title={"User Profile"} className={"z-depth-half m-2 h-100"}>
                <p className={"px-2 h5 text-capitalize"}>{fullName}</p>
                <p className={"px-2"}>{email}</p>
              </AccountCard>
            </MDBCol>
            <MDBCol size={"12"} md={"6"} className={"my-3"}>
              <AccountCard href={"/account/password/change"}
                           title={"Change Password"}
                           className={"z-depth-half m-2 h-100 "}>
              </AccountCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  };
}

export default graphql(
  USER_QUERY
)(AccountPage);