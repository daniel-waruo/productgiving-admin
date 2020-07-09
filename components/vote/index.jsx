import React, {Component} from "react";
import {MDBAnimation, MDBBtn, MDBCol, MDBIcon, MDBProgress, MDBRow} from "mdbreact";
import {SeatCard, UserVoted} from "./components/seats";
import Loader from "../Loader";
import {graphql} from 'react-apollo';
import {toggleVoteSubmit, voteQuery} from "./queries";
import compose from "lodash.flowright";
import SubmitVoteDialog from "./components/submitVoteDialog"

class Vote extends Component {

  onClick = () => {
    this.props.toggleVoteSubmit()
  };

  render() {
    // get data from props
    const {data: {loading, error, election, user, submitVote}} = this.props;
    // if loading return a spinner loader
    if (loading) return <Loader/>;
    // if there is an error show the error message
    // TODO: in future redirect to a something wrong page
    if (error) return <h1>{error.message}</h1>;
    // get id and voted from the user
    const {voted} = user;
    // if user has voted return user has voted
    if (voted) return <UserVoted/>;
    // get name and seat fro election
    const {name, seats} = election;
    // create a list of components from seats
    const seatLists = seats.map(
      (seat, key) => {
        return (
          <MDBCol size={"12"} md={"6"} key={key}>
            <SeatCard seat={seat} className={"my-3 mx-1"}/>
          </MDBCol>
        )
      }
    );

    // get the total number of seats voted for
    // return an array which if the seat has a selected voter it will return
    // 1 else it will return 0
    let votedSeats = seats.map(
      (seat) => {
        const {voted} = seat;
        if (voted)
          return 1;
        return 0;
      }
    );
    // reduce the votedSeats into the sum of all elements which is the number of
    // selected items
    votedSeats = votedSeats.reduce(
      (total, num) => {
        return total + num
      }
    );

    // check if all seats are voted for
    // this is done by checking whether the length
    // of the voted seats is equal to the total number of seats
    const finished = seats.length === votedSeats;
    // get the percentage of voting finished to be indicated by the loader
    const percentage = Math.round((votedSeats / seats.length)*100 );

    return (
      <>
        <MDBAnimation type={"fadeIn"}>
          <SubmitVoteDialog loading={loading} submitVote={submitVote}/>
          <MDBProgress material animated height={"0.9rem"}
                       value={percentage} className="my-1"
                       barClassName={"cyan darken-4"}>
            <strong>{percentage + "%"}</strong>
          </MDBProgress>
          <div className={"py-3"}>
            <h1 className={"text-center"}>{name}</h1>
            <h3 className={"text-center"}> Select Seat To Start Voting</h3>
          </div>
          <MDBRow center>
            {seatLists}
            <MDBBtn disabled={!finished}
                    className={"w-75 rounded-pill position-sticky cyan darken-4 mx-auto"}
                    onClick={this.onClick}
                    style={{textSize: "2rem!important"}}>
              <MDBIcon icon={"arrow-left"} className={"mx-2"}/>
              <span style={{fontSize: "1rem"}}>Finish Voting</span>
            </MDBBtn>
          </MDBRow>
        </MDBAnimation>
      </>
    )
  }
}

export default compose(
  graphql(voteQuery),
  graphql(toggleVoteSubmit, {name: "toggleVoteSubmit"})
)(Vote)