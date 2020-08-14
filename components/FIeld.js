import React from "react"
import {MDBInput} from "mdbreact";

export const FieldErrors = props => {
  // get data from props
  let {errors, raw = false} = props;

  if (raw)
    errors = errors.errors
  // create a list of error message components
  const errorList = errors ? errors.map(
    (error, key) => {
      return <div key={key} className={"text-center invalid-feedback"}>{error}</div>
    }
  ) : undefined;

  // return error components
  return (
    <>
      {errorList || <div className={"text-center valid-feedback"}>Looks Good</div>}
    </>
  )
};

export class Field extends React.PureComponent {
  render() {
    /** Component to handle Field Validation **/
    const {initial, errors, className, submitted, fieldErrors,showSuccess, ...otherProps} = this.props;

    let validationClass = "";

    if (submitted) {
      validationClass = (!errors && !fieldErrors) ? "" : "is-invalid";
      if (validationClass === "" && showSuccess)
        validationClass = "is-valid"
    }

    return (
      <>
        <MDBInput
          required
          className={`${className || ""} ${validationClass}`}
          valueDefault={initial}
          {...otherProps}
        >
          <FieldErrors errors={errors || fieldErrors}/>
        </MDBInput>
      </>
    )
  }
}