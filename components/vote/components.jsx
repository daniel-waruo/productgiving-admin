import React from 'react'
import Link from 'next/link'
import {MDBCard, MDBCardBody, MDBCardTitle, MDBIcon} from "mdbreact";

// user icon
const noUserIcon = (
  <MDBIcon fas icon={"user-alt-slash"} className={"float-right mr-3"}/>
);

const userIcon = (
  <MDBIcon far icon={"user"} className={"float-right mr-3"}/>
);

export class SeatCard extends React.Component {

  render() {
    // get data from props
    const {
      className,
      seat: {
        name,
        slug,
        voted
      }
    } = this.props;

    let imageContent = noUserIcon;

    if (voted) {
      const {image,firstName,lastName} = voted;
      imageContent = (
        <img className={"float-right rounded-circle z-depth-1"}
             alt={`Picture of ${firstName} ${lastName} selected for ${name} seat`}
             src={`${image}-/resize/75x75/`}/>
      )
    }
    return (
      <Link href={"vote/[slug]"} as={`vote/${slug}`} passHref>
        <MDBCard tag={"a"} className={className + " text-dark"}>
          <MDBCardBody>
            <MDBCardTitle className={"pl-5"}>
              {name}
              {imageContent}
            </MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </Link>
    )
  }
}

export function CandidateCard(props) {
  const {className, candidate, selected} = props;

  const {firstName, lastName, image} = candidate;

  let icon = (<MDBIcon size={"2x"} far icon={"circle"} className={"float-right mx-1 text-light"}/>);

  if (selected) {
    icon = (
      <MDBIcon size={"2x"} far icon={"check-circle"} className={"float-right mx-1 text-success"}/>
    )
  }

  return (
    <MDBCard className={className}>
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