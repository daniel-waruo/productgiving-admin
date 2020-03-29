import React from "react";
import {graphql} from "react-apollo";
import {resultsQuery} from "./queries";
import {MDBCol, MDBProgress, MDBRow} from "mdbreact";
import {SeatChart} from "./components/resultCharts";

class Results extends React.Component {
  render() {
    // get data from props
    const {data: {loading, error, election}} = this.props;

    if (loading) return <MDBProgress preloader material/>;

    if (error) return <h1>{error.message}</h1>;

    const {name, seats} = election;

    const seatPanels = seats.map(
      (seat, key) => (
        <MDBCol size={"12"} md={"6"} key={key}>
          <SeatChart seat={seat}/>
        </MDBCol>
      )
    );
    return (
      <>
        <h1 className={"text-center"}>{name}</h1>
        <h3 className={"text-center"}>Election Results</h3>
        <MDBRow>
          {seatPanels}
        </MDBRow>
      </>
    )
  }
}

export default graphql(resultsQuery)(Results)
