import React from "react";
import {ADD_USER_MUTATION} from "./queries";
import {MDBBtn, MDBCol, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {NextSeo} from "next-seo";
import {format_errors} from "../../_helpers";
import {USERS_QUERY} from "../UsersPage/queries";

class UserAddPage extends React.PureComponent {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    errors: {},
    submitted: false
  }
  mutationOptions = {
    refetchQueries: [{query: USERS_QUERY}]
  };

  completeHandler = ({createAdminUser: {user, errors}}) => {
    if (user) {
      // redirect to subscription page
      this.props.router.push(`/users`)
      return
    }
    this.setState({
      submitted: true,
      errors: format_errors(errors)
    })
  }

  getData = () => {
    const {firstName, lastName, phone, email} = this.state
    return {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email
    }
  }

  changeHandler = object => {
    this.setState(object)
  };

  render() {
    const {submitted, errors} = this.state;

    return (
      <>
        <NextSeo title={"Add User"}/>
        <h1 className={"mx-4"}>Add Admin User</h1>
        <MDBRow center>
          <MDBCol size={"12"} md={"10"}>
            <MutationForm mutation={ADD_USER_MUTATION}
                          data={this.getData()}
                          mutationOptions={this.mutationOptions}
                          onCompleted={this.completeHandler}>
              <MDBRow center>
                <MDBCol size={"12"} md={"6"}>
                  <Field
                    submitted={submitted}
                    label={"First Name"}
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
                    label={"Email"}
                    type={"email"}
                    required
                    fieldErrors={errors.email}
                    onChange={
                      e => this.changeHandler(
                        {email: e.target.value}
                      )
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"} md={"6"}>
                  <Field
                    submitted={submitted}
                    label={"Phone Number"}
                    required
                    fieldErrors={errors.phone}
                    onChange={e => this.changeHandler({phone: e.target.value})}
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
      </>
    )
  }
}

export default UserAddPage;
