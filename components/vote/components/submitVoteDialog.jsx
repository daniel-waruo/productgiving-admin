import React, {Component} from 'react';
import {MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {getCandidateIds} from "../../../_helpers";
import {submitVoteMutation, toggleVoteSubmit, voteQuery} from "../queries";
import cookie from "js-cookie"

class SubmitVoteDialog extends Component {
  static defaultProps = {
    submitVote: {
      open: true,
    }
  };

  submitVote = () => {
    const {data: {user: {id}}} = this.props;

    this.props.submitVoteMutation(
      {
        variables: {
          candidateIds: getCandidateIds(id)
        },
        refetchQueries: [
          {query: voteQuery}
        ]
      }
    ).then(
      () => {
        cookie.remove("votes")
      }
    );
    this.toggle()
  };

  toggle = () => {
    this.props.toggleVoteSubmit()
  };

  render() {
    const {submitVote, data: {loading}} = this.props;

    if (loading) return null;

    const {open} = submitVote;

    if (open) {
      return (
        <MDBModal
          isOpen={open}
          centered
        >
          <MDBModalHeader toggle={this.toggle} className={"cyan darken-4 text-light"}>
            <MDBIcon icon={"info"} className={"mx-4"}/>
            <span>Are You Sure ?</span>
          </MDBModalHeader>
          <MDBModalBody>
            Once you click <strong>SUBMIT</strong> you will not be able to
            <strong> access voting</strong>
          </MDBModalBody>
          <MDBModalFooter className={"justify-content-around"}>
            <MDBBtn className={"rounded-pill cyan darken-4"} style={{fontSize: "1rem"}} onClick={this.submitVote}>
              <MDBIcon far icon="paper-plane" className={"mx-2 text-white"}/>
              SUBMIT
            </MDBBtn>
            <MDBBtn className={"rounded-pill cyan darken-1"} onClick={this.toggle} style={{fontSize: "1rem"}}>
              <MDBIcon far icon="smile-wink" className={"mx-2 text-white"}/>
              Change Mind
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      );
    }
    return null;
  }
}

export default compose(
  graphql(gql`
    query {
      user {
        id
      }
    }
  `),
  graphql(toggleVoteSubmit, {name: "toggleVoteSubmit"}),
  graphql(submitVoteMutation, {name: "submitVoteMutation"}),
)(SubmitVoteDialog)

