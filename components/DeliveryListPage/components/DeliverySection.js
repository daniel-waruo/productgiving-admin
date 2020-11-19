import React from "react";
import {MDBBtn, MDBContainer, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import Link from "next/link";
import DeliveryState from "./DeliveryState";
import PropTypes from "prop-types";

class DeliverySection extends React.PureComponent {
  render() {
    const {campaigns} = this.props;
    return (
      <MDBContainer>
        <MDBTable responsive>
          <MDBTableHead>
            <tr>
              <th colSpan={"2"}>Name</th>
              <th>State</th>
              <th/>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              campaigns.map(
                ({id, name, image, delivery: {state}}, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <Link href={"/campaigns/[id]"} as={`/campaigns/${id}`}>
                          <a>
                            <img alt={`${name} campaign`}
                                 className={"rounded-circle"}
                                 src={`${image}-/resize/50x50/`}/>
                          </a>
                        </Link>
                      </td>
                      <td>
                        <Link href={"/campaigns/[id]"} as={`/campaigns/${id}`}>
                          <a>{name}</a>
                        </Link>
                      </td>
                      <td>
                        <DeliveryState state={state}/>
                      </td>
                      <td>
                        <Link href={"/deliveries/[id]"} as={`/deliveries/${id}`}>
                          <a>
                            <MDBBtn size={"sm"} className={"rounded-pill"} color={"light-blue"} outline>
                              <MDBIcon icon={"eye"} className={"mx-2"}/>
                              view
                            </MDBBtn>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  )
                }
              )
            }
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    )
  }
}

DeliverySection.propTypes = {
  campaigns: PropTypes.array.isRequired
}
export default DeliverySection
