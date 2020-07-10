import React from 'react'
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import Loader from "../../Loader";
import {APP_QUERY} from "../../app/queries";
import AdminCard from "./AdminCard";

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
            <MDBRow center>
              <MDBCol size={"12"} sm={"6"} lg={"4"}>
                <AdminCard title={"Students Enrolled"} value={"200"}/>
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