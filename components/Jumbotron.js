import React, {PureComponent} from 'react'

import {MDBCol, MDBJumbotron, MDBMask, MDBRow, MDBView} from "mdbreact";


class Jumbotron extends PureComponent {

  render() {
    return (
      <div className={"bg"}>
        <style>{`
        j-100
        `}
        </style>
        <MDBView className={"f-100-no-mobile overflow-hidden"}>
          <MDBMask className="flex-center" overlay={"black-strong"}>
            <MDBJumbotron style={{padding: 0}} className="bg-transparent f-100-no-mobile w-100" fluid >
              <MDBRow className={"h-100"}>
                <MDBCol size={"12"} className="text-white text-center py-md-1 py-5 px-md-1 px-4 my-auto">
                  {this.props.children}
                </MDBCol>
              </MDBRow>
            </MDBJumbotron>
          </MDBMask>
        </MDBView>
      </div>
    )//content to be rendered after page load
  }
}

export default Jumbotron;
