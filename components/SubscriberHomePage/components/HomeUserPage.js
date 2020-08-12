import React from 'react'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import Loader from "../../Loader";
import {APP_QUERY} from "../../app/queries";
import Link from "next/link";

class HomeUserPage extends React.Component {

  render() {
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props;
    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return null;

    const {email, firstName, lastName} = user;
    const fullName = `${firstName} ${lastName}`;

    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBContainer>
            <h1>Subscriber Home Page</h1>
            <MDBRow className={"mt-5"}>
              <MDBCol size={"12"} md={"4"}>
                <MDBCard style={{borderRadius: "1rem"}}>
                  <MDBCardImage zoom src={'/subscriptions.jpg'} waves
                                style={{
                                  borderTopRightRadius: "1rem",
                                  borderTopLeftRadius: "1rem",
                                  height: "14rem",
                                  width: "100%"
                                }} overlay={"teal-light"}/>
                  <MDBCardBody className={"text-center"}>

                    <Link href={'/subscriber/subscriptions'}>
                      <a>
                        <MDBBtn tag={"span"} className={"rounded-pill"} outline>My Subscriptions</MDBBtn>
                      </a>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol size={"12"} md={"4"}>
                <MDBCard style={{borderRadius: "1rem"}}>
                  <MDBCardImage zoom src={'/my-account.jpg'} waves
                                overlay={"teal-light"}
                                style={{
                                  borderTopRightRadius: "1rem",
                                  borderTopLeftRadius: "1rem",
                                  height: "14rem",
                                  width: "100%"
                                }
                                }/>
                  <MDBCardBody className={"text-center"}>

                    <Link href={'/subscriber/account'}>
                      <a>
                        <MDBBtn tag={"span"} className={"rounded-pill"} outline>
                          <MDBIcon far icon={"user"} className={"mx-1"}/>
                          My Account
                        </MDBBtn>
                      </a>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </>
    )
  };
}

export default graphql(
  APP_QUERY,
  //coursesQuery
)(HomeUserPage);