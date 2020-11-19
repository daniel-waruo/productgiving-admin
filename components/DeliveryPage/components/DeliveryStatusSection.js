import React from "react";
import PropTypes from "prop-types";
import {MDBIcon} from "mdbreact";

class DeliveryStatusItem extends React.PureComponent {
  render() {
    return (
      <div className={`step ${this.props.active ? "active" : ""}`}>
        {this.props.children}
      </div>
    )
  }
}

DeliveryStatusItem.propTypes = {
  active: PropTypes.bool
}

class DeliveryStatusSection extends React.PureComponent {

  render() {
    const {state} = this.props;
    return (
      <>
        <style>{`
              .track {
           position: relative;
           background-color: #ddd;
           height: 7px;
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           margin-bottom: 60px;
           margin-top: 50px
       }
      
       .track .step {
           -webkit-box-flex: 1;
           -ms-flex-positive: 1;
           flex-grow: 1;
           width: 25%;
           margin-top: -18px;
           text-align: center;
           position: relative
       }
      
       .track .step.active:before {
           background: #8bd62c
       }
      
       .track .step::before {
           height: 7px;
           position: absolute;
           content: "";
           width: 100%;
           left: 0;
           top: 18px
       }
      
       .track .step.active .icon {
           background: #8bd62c;
           color: #fff
       }
      
       .track .icon {
           display: inline-block;
           width: 40px;
           height: 40px;
           line-height: 40px;
           position: relative;
           border-radius: 100%;
           background: #ddd
       }
      
       .track .step.active .text {
           font-weight: 400;
           color: #000
       }
      
       .track .text {
           display: block;
           margin-top: 7px
       }
        `}
        </style>
        <div className="track">
          <DeliveryStatusItem active={true}>
          <span className={"icon"}>
            <MDBIcon icon={"spinner"} spin/>
          </span>
            <span className="text">
            Pending
          </span>
          </DeliveryStatusItem>
          <DeliveryStatusItem active={state === "PROCESSING" || state === "READY" || state === "DELIVERED"}>
          <span className={"icon"}>
            <MDBIcon icon={"truck"}/>
          </span>
            <span className="text">
            Processing
          </span>
          </DeliveryStatusItem>
          <DeliveryStatusItem active={state === "READY" || state === "DELIVERED"}>
          <span className={"icon"}>
            <MDBIcon icon={"box"}/>
          </span>
            <span className="text">
            Ready
          </span>
          </DeliveryStatusItem>
          <DeliveryStatusItem active={state === "DELIVERED"}>
          <span className={"icon"}>
            <MDBIcon icon={"check"}/>
          </span>
            <span className="text">
            Delivered
          </span>
          </DeliveryStatusItem>
        </div>
      </>
    )
  }
}

DeliveryStatusSection.propTypes = {
  state: PropTypes.string.isRequired
}
export default DeliveryStatusSection;