import React from 'react'
import {MDBCard, MDBCardBody, MDBIcon} from "mdbreact";

import {candidatesQuery, voteQuery} from "../queries";

export class CandidateCard extends React.Component {
  // event to be called on click
  onClick = () => {
    const {id, seat: {slug}} = this.props.candidate;
    this.props.vote({
      variables: {
        candidateID: id,
        seatSlug: slug
      },
      refetchQueries: [
        {
          query: candidatesQuery,
          variables: {
            slug: slug
          }
        },
        {query: voteQuery}
      ]
    })
  };

  render() {
    // get data from props
    const {className, candidate} = this.props;
    const {firstName, lastName, image, selected} = candidate;

    // set default candidate icon
    let icon = (<MDBIcon size={"2x"} far icon={"circle"} className={"float-right mx-1 text-light"}/>);

    // if the candidate has been selected set the success icon
    if (selected) {
      icon = (
        <MDBIcon size={"2x"} far icon={"check-circle"} className={"float-right mx-1 text-success"}/>
      )
    }

    return (
      <MDBCard className={className} onClick={this.onClick}>
        <MDBCardBody>
          <img className={"float-left rounded-circle z-depth-1"}
               alt={`Picture of ${firstName} ${lastName}`}
               src={`${image}-/resize/75x75/`}/>
          <h4 className={"mt-3"} style={{marginLeft: "30%"}}>
            {`${firstName} ${lastName}`}
            {icon}
          </h4>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export class NoCandidatesPage extends React.Component {
  render() {
    return (
      <h1 className={"text-center"}>No candidates found</h1>
    )
  }
}