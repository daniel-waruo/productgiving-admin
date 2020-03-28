import React from "react";
import {withRouter} from "next/router";
import {graphql} from 'react-apollo';
import {candidatesQuery, voteMutation} from "./queries";
import SpinnerLoader from "../global/loaders/spinnerLoader";
import {CandidateCard, NoCandidatesPage} from "./components/candidates";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import compose from "lodash.flowright"
import Link from "next/link"


class CandidateVote extends React.Component {

  render() {
    // get data from props
    const {
      data: {
        loading,
        error,
        candidates
      }
    } = this.props;
    // if loading return a loader
    if (loading) return <SpinnerLoader/>;

    // if the is an error show it in this error message
    // TODO: redirect the  error page
    if (error) return <h1>{error.message}</h1>;

    // if no candidates returned return the no candidates page
    // TODO:improve appearance of no candidates page
    if (!candidates.length) return <NoCandidatesPage/>;

    // return a list of components from the list of candidates
    const candidatesList = candidates.map(
      (candidate, key) => (
        <MDBCol size={"12"} md={"6"} key={key}>
          <CandidateCard vote={this.props.vote} candidate={candidate} className={"my-3"}/>
        </MDBCol>
      )
    );

    return (
      <>
        <div className={"px-2"}>
          <h1 className={"text-center py-1"}>
            Select Candidate to Vote for
          </h1>
          <MDBRow>
            {candidatesList}
            <Link href={"/vote"} >
              <a className={"w-75 mx-auto"}>
                <MDBBtn className={"w-100 rounded-pill position-sticky cyan darken-4"} style={{fontSize:"1rem"}} >
                  <MDBIcon icon={"arrow-left"} className={"mx-2"}/>
                  Continue Voting
                </MDBBtn>
              </a>
            </Link>
          </MDBRow>
        </div>
      </>
    )
  }
}

export default withRouter(// add with router to get the the seat slug  from query
  compose(
    graphql(voteMutation, {name: "vote"}),
    graphql(
      candidatesQuery,
      {
        options: (props) => {
          const {slug} = props.router.query;
          return {
            variables: {slug: slug}
          }
        }
      }
    )
  )(CandidateVote)
)