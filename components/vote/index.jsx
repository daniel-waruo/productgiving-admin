import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import {SeatCard} from "./components";
import SpinnerLoader from "../global/loaders/spinnerLoader";
import {graphql} from 'react-apollo';
import {voteQuery} from "./queries";

class Vote extends Component {
  render() {
    const {data: {loading, error, election}} = this.props;

    if (loading) return <SpinnerLoader/>;

    if (error) return <h1>{error.message}</h1>;

    const {name, seats} = election;

    const seatLists = seats.map(
      (seat, key) => {
        const {name, slug} = seat;
        return (
          <MDBCol size={"12"} md={"6"} key={key}>
            <SeatCard title={name} className={"my-3 mx-1"} href={`vote/${slug}`}/>
          </MDBCol>
        )
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
        </MDBRow>
      </>
    )
  }
}

export default graphql(voteQuery)(
  Vote
)