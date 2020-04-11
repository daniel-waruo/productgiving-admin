import React from "react"
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBProgress, MDBRow} from "mdbreact";


export class CandidateResultsCard extends React.Component {

  render() {
    // get data from props
    const {firstName, lastName, image, votes, totalVotes} = this.props;
    // round of the percentage
    const percentage = Math.round(votes / totalVotes * 100);

    return (
      <MDBCard className={"my-2 hoverable"}>
        <MDBCardBody className={"p-2"}>
          <MDBRow>
            <MDBCol size={"2"}>
              <img className={"rounded-circle z-depth-1 mx-auto"}
                   alt={`Picture of ${firstName} ${lastName}`}
                   height={"50px"}
                   width={"50px"}
                   src={`${image}-/resize/50x50/`}/>
            </MDBCol>
            <MDBCol size={"10"}>
              <small >
                {`${firstName} ${lastName} - ${votes} votes`}
              </small>
              <MDBProgress material
                           animated
                           barClassName={"cyan darken-3"}
                           value={percentage}/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export class SeatResults extends React.Component {

  render() {
    // get data from props
    const {seat: {name, candidates}} = this.props;

    // get candidates voting results sorted from largest to smallest
    const sorted = candidates.sort(
      (candidate1, candidate2) => {
        return candidate1.votes.number - candidate2.votes.number
      }
    ).reverse();

    // get and array of sorted voted
    const votes = sorted.map(
      ({votes: {number}}) => number
    );

    // get the total votes cast for a particular seat
    const totalVotes = votes.reduce(
      (total, num) => total + num
    );

    // list of Candidate Result Components
    const candidatesList = sorted.map(
      ({firstName, lastName, image, votes: {number}}, key) => (
        <CandidateResultsCard
          key={key}
          firstName={firstName}
          lastName={lastName}
          image={image}
          votes={number}
          totalVotes={totalVotes}
        />
      )
    );
    // return the component
    return (
      <>
        <MDBCard style={{marginTop: "1rem"}}>
          <MDBCardHeader color="cyan darken-2" >{name}</MDBCardHeader>
          <MDBCardBody>
            {candidatesList}
          </MDBCardBody>
        </MDBCard>
      </>
    )
  }
}
