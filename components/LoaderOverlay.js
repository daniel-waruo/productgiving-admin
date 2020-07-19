import React from "react"
import Loader from "./Loader";

export default class LoaderOverlay extends React.Component {
  render() {
    const {loading} = this.props;
    const loader = loading ?
      <Loader className={`${loading ? "" : "d-none"}`}/>
      : null;

    return (
      <div className={"view"}>
        {loader}
        {this.props.children}
        <div className={`mask flex-center rgba-stylish-light ${loading ? "" : "d-none"}`}>
        </div>
      </div>
    )
  }
}