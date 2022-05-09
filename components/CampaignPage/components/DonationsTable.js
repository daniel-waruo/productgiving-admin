import React from "react"
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";


class DonationsTable extends React.PureComponent {

  render() {
    const {donations} = this.props;

    return (
      <>
        <h3>Campaign Donations</h3>
        <form>
          <MDBRow>
            <MDBCol size={"12"} md={"8"}>
              <MDBInput label={"Search"} group/>
            </MDBCol>
            <MDBCol size={"12"} md={"4"} className={"text-center"}>
              <MDBBtn color={"light-green"} type={"submit"} className={"rounded-pill"} outline>
                <MDBIcon icon={'search'} className={"mx-2"}/>
                SEARCH
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
        <MDBTable responsive>
          <MDBTableHead>
            <tr>
              <th>Donor Name</th>
              <th>Amount Paid</th>
              <th>Transaction Code</th>
              <th>Date</th>
              <th/>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              donations.map(
                ({id, donorName, amountPaid, createdOn,transaction}, key) => {
                  const date = new Date(createdOn);
                  return (
                    <tr key={key}>
                      <td>{donorName}</td>
                      <td>{amountPaid}</td>
                      <td>{transaction.mpesaCode}</td>
                      <td>{date.toLocaleString()}</td>
                    </tr>
                  )
                }
              )
            }
          </MDBTableBody>
        </MDBTable>
      </>
    )
  }
}

export default DonationsTable
