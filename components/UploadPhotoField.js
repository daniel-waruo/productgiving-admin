import React from "react";
import {UPLOAD_CARE_PUBLIC_KEY} from "../_constants";
import {Widget} from "@uploadcare/react-widget";
import PropTypes from 'prop-types';
//import styling from "./styling"

export default class UploadPhotoField extends React.PureComponent {

  constructor(props) {
    super(props);
    this.widgetApi = React.createRef();
  }

  clickHandler = () => {
    // open add photo dialog
    this.widgetApi.current.openDialog();
  };

  changeHandler = ({cdnUrl}) => {
    // set cdn url to state
    this.props.onChange(cdnUrl)
  };

  render() {
    // get data from props
    const {initial} = this.props;
    return (
      <div className={"d-none"}>
        <Widget
          value={initial}
          onChange={this.changeHandler}
          ref={this.widgetApi}
          publicKey={UPLOAD_CARE_PUBLIC_KEY}
          imagesOnly
          doNotStore
          previewStep
          crop={""}
        />
      </div>
    )
  }
}

UploadPhotoField.propTypes = {
  onChange: PropTypes.func.isRequired,
  initial: PropTypes.string
};