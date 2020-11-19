import React from "react";
import {
  MDBAnimation,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow
} from "mdbreact";
import PropTypes from "prop-types";
import Loader from "./Loader";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

class StateCard extends React.PureComponent {

  render() {
    const {icon, title, number, state} = this.props;
    return (
      <MDBCard className={"my-3 mx-2 h-100"} role={"button"} style={{borderRadius: "1rem"}}>
        <MDBCardBody>
          <MDBCardTitle className={"pl-2 pb-2 border-bottom border-grey mb-3"}>
            {title}
          </MDBCardTitle>
          <MDBCardText tag={"span"} className={"float-right"} style={{fontSize: "3rem"}}>
            {number}
          </MDBCardText>
          <Link href={`/deliveries/state/${state}`}>
            <a>
              <MDBBtn color={"light-green"} className={"rounded-pill"}>
                <MDBIcon icon={icon} className={"mx-3"}/>
                VIEW
              </MDBBtn>
            </a>
          </Link>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

StateCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.any.isRequired,
  state: PropTypes.string.isRequired,
}

class DeliveryStatePage extends React.PureComponent {
  render() {
    const {data: {error, loading, deliveryCount}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
            <MDBAnimation type={"fadeInDown"} delay={"2"} className={"h-100"}>
              <StateCard state={"all"} icon={"filter"} title={"All"} number={deliveryCount.all}/>
            </MDBAnimation>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
            <MDBAnimation type={"fadeInUp"} className={"h-100"}>
              <StateCard state={"pending"} icon={"spinner"} title={"Pending"} number={deliveryCount.pending}/>
            </MDBAnimation>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
            <MDBAnimation type={"fadeInRight"} className={"h-100"}>
              <StateCard state={"processing"} icon={"truck"} title={"Processing"} number={deliveryCount.processing}/>
            </MDBAnimation>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
            <MDBAnimation type={"fadeInLeft"} className={"h-100"}>
              <StateCard state={"ready"} icon={"box"} title={"Ready"} number={deliveryCount.ready}/>
            </MDBAnimation>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
            <MDBAnimation type={"fadeInRight"} className={"h-100"}>
              <StateCard state={"delivered"} icon={"check"} title={"Delivered"} number={deliveryCount.delivered}/>
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default compose(
  graphql(
    gql`
      query {
        deliveryCount{
          all
          pending
          processing
          ready
          delivered
        }
      }
    `
  )
)(DeliveryStatePage);
