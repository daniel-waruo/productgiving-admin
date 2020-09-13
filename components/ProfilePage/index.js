import React from "react";
import {USER_EDIT_PROFILE_MUTATION} from "./queries";
import {graphql} from "react-apollo";
import Loader from "../Loader";
import compose from 'lodash.flowright'
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {USER_QUERY} from "../AccountPage/queries";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {NextSeo} from "next-seo";
import {format_errors} from "../../_helpers";

class ProfilePage extends React.PureComponent {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    errors: {},
    submitted: false
  }
  mutationOptions = {
    refetchQueries: [{query: USER_QUERY}]
  };

  completeHandler = ({editUserProfile: {user, errors}}) => {
    if (user) {
      // redirect to subscription page
      this.props.router.push(`/member/account`)
      return
    }
    this.setState({
      submitted: true,
      errors: format_errors(errors)
    })
  }

  getData = () => {
    const {firstName, lastName, phone} = this.state
    const {data: {user}} = this.props;
    return {
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      phone: phone ? phone : user.phone,
    }
  }

  changeHandler = object => {
    this.setState(object)
  };

  render() {
    const {data: {loading, error, user}} = this.props;

    if (loading) return <Loader/>;

    if (error) return <h1>{error.message}</h1>;

    const {submitted, errors} = this.state;

    return (
      <>
        <NextSeo title={"Account Profile"}/>
        <h1 className={"mx-4"}>Your Profile</h1>
        <MDBContainer>
          <MDBRow center>
            <MDBCol size={"12"} md={"10"}>
              <MutationForm mutation={USER_EDIT_PROFILE_MUTATION}
                            data={this.getData()}
                            mutationOptions={this.mutationOptions}
                            onCompleted={this.completeHandler}>
                <MDBRow>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      submitted={submitted}
                      label={"First Name"}
                      initial={user ? user.firstName : ""}
                      required
                      fieldErrors={errors.firstName}
                      onChange={
                        e => this.changeHandler(
                          {firstName: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      submitted={submitted}
                      label={"Last Name"}
                      initial={user ? user.lastName : ""}
                      required
                      fieldErrors={errors.lastName}
                      onChange={
                        e => this.changeHandler(
                          {lastName: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      submitted={submitted}
                      label={"Phone Number"}
                      initial={user ? user.phone : ""}
                      required
                      fieldErrors={errors.phone}
                      onChange={
                        e => this.changeHandler(
                          {phone: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"}/>
                  <MDBCol size={"6"} className={"text-center my-4"}>
                    <MDBBtn color={"light-green"} type={"submit"} className={"rounded-pill"}>SUBMIT</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MutationForm>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  }
}

export default compose(
  graphql(USER_QUERY)
)(ProfilePage);
