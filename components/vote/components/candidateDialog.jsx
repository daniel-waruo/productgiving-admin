import React, {Component} from 'react';
import {MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import {closeCandidateDialog} from "../queries";
import Link from "next/link"


class CandidateDialog extends Component {
  static defaultProps = {
    candidateDialog: {
      open: false,
      candidate: null,
    }
  };

  toggle = () => {
    this.props.closeCandidateDialog()
  };

  render() {

    const {candidateDialog, loading} = this.props;

    if (loading) return null;

    const {open, candidate} = candidateDialog;

    if (open) {
      const {firstName, lastName} = candidate;
      return (
        <MDBModal
          isOpen={open}
          centered
        >
          <MDBModalHeader toggle={this.toggle}>
            <MDBIcon icon={"check-circle"} className={"mx-4"}/>
            <span>Voting Successful</span>
          </MDBModalHeader>
          <MDBModalBody>
            You Voted for {firstName} {lastName}<br/>
            If you change your mind you can close the dialog or click on 'change my mind'
            If you choose to continue you will not be allowed to select a candidate.
          </MDBModalBody>
          <MDBModalFooter className={"justify-content-around"}>
            <Link href={"/vote"}>
              <a>
                <MDBBtn outline className={"rounded-pill"}>
                  <MDBIcon icon="arrow-left" style={{fontSize: "1rem"}} className={"mx-2"}/>
                  Continue Voting
                </MDBBtn>
              </a>
            </Link>
            <MDBBtn outline className={"rounded-pill"} onClick={this.toggle}>
              <MDBIcon far icon="smile-wink" style={{fontSize: "1rem"}} className={"mx-2"}/>
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
  graphql(closeCandidateDialog, {name: "closeCandidateDialog"})
)(CandidateDialog)

