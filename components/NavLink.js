import React from "react";

export default class NavLink extends React.PureComponent {
  render() {
    let {children, active, className, ...otherProps} = this.props;
    className = className + " nav-link ";
    if (active)
      className = className + " active "
    return (
      <a className={className} {...otherProps}>
        {children}
      </a>
    )
  }
}