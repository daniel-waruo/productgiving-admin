import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import {APP_QUERY} from "../App/queries";
import {FormAlerts, MutationForm} from "../Form";
import {Field} from "../FIeld";
import {format_errors} from "../../_helpers";
import {PASSWORD_CHANGE_MUTATION} from "./queries";
import {logout} from "../../utils/auth";


class PasswordChangePage extends React.PureComponent {
  state = {
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    errors: {},
    submitted: false
  };
  mutationOptions = {
    refetchQueries: [
      {query: APP_QUERY}
    ]
  };

  onChange = object => {
    this.setState(object)
  };

  getFormData = () => {
    const {errors, submitted, ...formData} = this.state;
    return formData;
  };

  completeHandler = ({changePassword: {success, errors}}) => {
    if (!success) {
      this.setState(
        {
          errors: format_errors(errors),
          submitted: true
        });
    } else {
      logout()
    }
  };

  render() {
    const {errors, submitted} = this.state;
    return (
      <>
        <MDBRow center>
          <MDBCol size={"11"} md={"9"} lg={"6"} className={"rounded p-2"}>
            <MutationForm data={this.getFormData()}
                          onCompleted={this.completeHandler}
                          mutation={PASSWORD_CHANGE_MUTATION}
                          mutationOptions={this.mutationOptions}>

              <FormAlerts errors={errors.nonFieldErrors}/>
              <div className={"p-3"}>
                <h1 className="text-center mb-4">Change Password</h1>
                <Field
                  label="Current Password"
                  icon="lock"
                  type="password"
                  errors={errors.oldPassword}
                  submitted={submitted}
                  onChange={e => {
                    this.onChange({oldPassword: e.target.value})
                  }}
                />
                <Field
                  label="New Password"
                  icon="lock"
                  type="password"
                  errors={errors.newPassword1}
                  submitted={submitted}
                  onChange={e => {
                    this.onChange({newPassword1: e.target.value})
                  }}
                />
                <Field
                  label="Repeat new Password"
                  icon="lock"
                  type="password"
                  errors={errors.newPassword2}
                  submitted={submitted}
                  onChange={e => {
                    this.onChange({newPassword2: e.target.value})
                  }}
                />
                <div className="text-center">
                  <MDBBtn
                    color={"light-green"}
                    type="submit"
                    style={{fontSize: "1rem"}}
                    className={"rounded-pill w-100"}>
                    Change Password
                    <MDBIcon className={"mx-4"} icon="lock-open"/>
                  </MDBBtn>
                </div>
              </div>
            </MutationForm>
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}

export default PasswordChangePage
