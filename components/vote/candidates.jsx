import React from "react";
import {withRouter} from "next/router";
import {graphql} from 'react-apollo';
import {candidatesQuery} from "./queries";
import SpinnerLoader from "../global/loaders/spinnerLoader";
import {CandidateCard} from "./components";
import {MDBCol, MDBRow} from "mdbreact";

class CandidateVote extends React.Component {

  render() {
    const {
      data: {
        loading,
        error,
        candidates
      }
    } = this.props;

    if (loading) return <SpinnerLoader/>;
    if (error) return null;

    const candidatesList = candidates.map(
      (candidate, key) => (
        <MDBCol size={"12"} md={"6"} key={key}>
          <CandidateCard candidate={candidate} className={"my-3"}/>
        </MDBCol>
      )
    );
    return (
      <div className={"px-2"}>
        <h1 className={"text-center py-1"}>
          Select Candidate to Vote for
        </h1>
        <MDBRow>
          {candidatesList}
        </MDBRow>
      </div>
    )
  }
}

export default withRouter(
  graphql(
    candidatesQuery,
    {
      options: (props) => {
        const {slug} = props.router.query;
        return {
          variables: {
            slug: slug
          }
        }
      }
    }
  )(CandidateVote)
)