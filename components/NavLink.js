import React from "react";
import Link from "next/link";

export default class NavLink extends React.PureComponent {
  render() {
    let {children, active, className, href, as, ...otherProps} = this.props;
    className = className + " nav-link ";
    if (active)
      className = className + " active "
    if (href) {
      return <Link href={href} as={as}>
        <a className={className} {...otherProps}>
          {children}
        </a>
      </Link>
    }
    return (
      <a className={className} {...otherProps}>
        {children}
      </a>
    )
  }
}