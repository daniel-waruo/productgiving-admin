import React from "react";
import {MDBAnimation, MDBCard, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {UPLOAD_CARE_PUBLIC_KEY} from "../../_constants";
import {Widget} from "@uploadcare/react-widget";

export class ImagesSection extends React.Component {

  imageClickHandler = (ref) => {
    // open add photo dialog
    ref.current.openDialog();
  };

  changeHandler = ({cdnUrl}) => {
    // set cdn url to state
    this.props.setImage(cdnUrl)
  };

  render() {
    const {images} = this.props;
    const newImageRef = React.createRef();
    return (
      <MDBContainer>
        <MDBRow>
          {
            images.map(
              (image, key) => (
                <MDBCol xl="3" md="4" sm={"6"} key={key}>
                  <MDBAnimation type={"bounceIn"}>
                    <MDBCard>
                      <MDBCardImage className="img-fluid" src={`${image}-/resize/200x200/`}/>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              )
            )
          }
          <MDBCol xl="3" md="4" sm={"6"} className={"py-3 "}>
            <MDBCard className={"z-depth-1 text-center"}
                     onClick={() => this.imageClickHandler(newImageRef)}
                     style={{minHeight: "10rem", borderRadius: "1rem"}}>
              <MDBIcon icon={"plus-circle"}
                       size={"3x"}
                       className={"my-auto"}/>
              <div className={"d-none"}>
                <Widget
                  onChange={this.changeHandler}
                  ref={newImageRef}
                  publicKey={UPLOAD_CARE_PUBLIC_KEY}
                  imagesOnly
                  doNotStore
                />
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}