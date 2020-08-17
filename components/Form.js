import React from "react";
import LoaderOverlay from "./LoaderOverlay";
import PropTypes from 'prop-types';
import {Mutation} from "react-apollo";
import {MDBAlert, MDBAnimation} from "mdbreact";

export class MutationForm extends React.PureComponent {
  /**
   * This form handles calling of mutation and setting of variables
   * in a mutation and setting of loading and submitted states
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  submitHandler = (e, mutate) => {
    e.preventDefault();
    // set loading state as true
    this.setState({loading: true});
    // call the mutation with additional mutation from props
    const options = this.props.mutationOptions || {};
    mutate({
      ...options,
      variables: this.props.data
    })
  };

  completedHandler = (data) => {
    this.setState({loading: false});
    // call on Completed on the 
    this.props.onCompleted(data)
  };

  errorHandler = (error) => {
    this.props.onError(error)
  };

  render() {
    // get data from props
    const {children, mutation} = this.props;
    // return form with mutation component
    return (
      <Mutation mutation={mutation} onCompleted={this.completedHandler} onError={this.errorHandler}>{
        (mutate) => {
          // return the form UI
          return (
            <LoaderOverlay loading={this.state.loading}>
              <form onSubmit={e => this.submitHandler(e, mutate)}>
                {children}
              </form>
            </LoaderOverlay>
          )
        }
      }
      </Mutation>
    )
  }
}

MutationForm.defaultProps = {
  onError: error => console.log(error)
};
MutationForm.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  onError: PropTypes.func,
  onCompleted: PropTypes.func.isRequired,
  mutation: PropTypes.any.isRequired,
  mutationOptions: PropTypes.object
};

export class FormAlerts extends React.PureComponent {
  render() {
    return this.props.errors ? this.props.errors.map(
      (error, key) => (
        <MDBAnimation type={"fadeInDown"} key={key} className={"mt-2 mx-2"}>
          <MDBAlert key={key} color={"danger"} className={"text-center z-depth-1 mb-4"}>{error}</MDBAlert>
        </MDBAnimation>
      )
    ) : null;

  }
}

FormAlerts.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};