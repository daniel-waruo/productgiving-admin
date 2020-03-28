import React, {Component} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import {SeatCard, UserVoted} from "./components/seats";
import SpinnerLoader from "../global/loaders/spinnerLoader";
import {graphql} from 'react-apollo';
import {submitVoteMutation, voteQuery} from "./queries";
import compose from "lodash.flowright";
import {getCandidateIds} from "../../_helpers";


class Vote extends Component {

  submitVote(userID) {
    this.props.submitVote(
      {
        variables: {
          candidateIds: getCandidateIds(userID)
        },
        refetchQueries: [
          {query: voteQuery}
        ]
      }
    )
  }

  render() {
    const {data: {loading, error, election, user}} = this.props;

    if (loading) return <SpinnerLoader/>;

    if (error) return <h1>{error.message}</h1>;

    const {id, voted} = user;

    if (voted) return <UserVoted/>;

    const {name, seats} = election;

    const seatLists = seats.map(
      (seat, key) => {
        return (
          <MDBCol size={"12"} md={"6"} key={key}>
            <SeatCard seat={seat} className={"my-3 mx-1"}/>
          </MDBCol>
        )
      }
    );

    // return true when all seat candidates have been selected
    const finished = seats.reduce(
      (accumulator, seat) => {
        const {voted} = seat;
        return accumulator && Boolean(voted);
      }
    );

    return (
      <>
        <div className={"py-3"}>
          <h1 className={"text-center"}>{name}</h1>
          <h3 className={"text-center"}> Select Seat To Start Voting</h3>
        </div>
        <MDBRow center>
          {seatLists}
          <MDBBtn disabled={!finished} className={"w-75 rounded-pill position-sticky mx-auto"}
                  onClick={() => this.submitVote(id)}
                  style={{textSize: "2rem!important"}}>
            <MDBIcon icon={"arrow-left"} className={"mx-2"}/>
            <span style={{fontSize: "1rem"}}>Finish Voting</span>
          </MDBBtn>
        </MDBRow>
      </>
    )
  }
}

export default compose(
  graphql(voteQuery),
  graphql(submitVoteMutation, {name: "submitVote"}),
)(Vote)