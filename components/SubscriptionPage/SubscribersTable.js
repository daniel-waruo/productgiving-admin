import React from "react";
import {MDBContainer, MDBDataTable} from "mdbreact"
import PropTypes from "prop-types"

export default class SubscribersTable extends React.PureComponent {

  render() {
    const {students, title} = this.props;

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Email Address',
          field: 'email',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Subscription Balance',
          field:'balance',
          sort: 'asc',
          width: 100
        }
      ],
      rows: students
    };
    return (
      <MDBContainer fluid className={"py-3"}>
        <h3>{title}</h3>
        <MDBDataTable
          striped
          bordered
          responsiveMd
          hover
          noBottomColumns
          data={data}
        />
      </MDBContainer>
    )
  }
}

SubscribersTable.propTypes = {
  students: PropTypes.array.isRequired
}