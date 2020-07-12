import React from "react";
import {MDBCollapse} from "mdbreact";
import PropTypes from "prop-types";

export class StepContainer extends React.PureComponent {

  render() {
    return (
      <ol className="step pl-0">
        {this.props.children}
      </ol>
    )
  }
}

export class StepItem extends React.PureComponent {
  state = {
    animation: true
  }

  render() {
    const {id, toggle, name, currentID, children, icon} = this.props
    const className = "hover-fade waves-ripple number btn-outline-default"

    const isSelected = currentID === id

    return (
      <li className="step-element pb-0">
        <div className="step-number" onClick={toggle(id)}>
          {icon(className)}
        </div>
        <div className="step-excerpt w-100">
          <p className={`pt-2 ${isSelected ? "d-none" : ""}`}>{name}</p>
          <MDBCollapse id={id} isOpen={currentID}>
            <h2>{name}</h2>
            {children}
          </MDBCollapse>
        </div>
      </li>
    )
  }

}

StepItem.propTypes = {
  id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  currentID: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.func.isRequired
}
const selectStyle = {
  display: "block",
  width: "393.625px",
  position: "absolute",
  top: "0px",
  left: "0px",
  opacity: "1"
}

export class Select extends React.PureComponent {
  render() {
    const {options} = this.props;
    const selectOptions = options.map(
      ({text, value}) => {
        return (
          <option value={value}>{text}</option>
        )
      }
    )
    return (
      <div className="select-wrapper mdb-select md-form">
        <div>
          <select className="browser-default custom-select" onChange={this.props.onChange}>
            <option>Choose your option</option>
            {selectOptions}
          </select>
        </div>
      </div>
    )
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
}