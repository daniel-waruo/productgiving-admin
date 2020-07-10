import React from "react";
import {MDBContainer, MDBDataTable} from "mdbreact"
import PropTypes from "prop-types"

export default class CourseStudentsTable extends React.PureComponent {

  render() {
    const {students, title} = this.props;

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Email Address',
          field: 'email',
          sort: 'asc',
          width: 150
        }
      ],
      rows: students
    };
    return (
      <MDBContainer className={"py-3"}>
        <h3>{title}</h3>
        <MDBDataTable
          striped
          bordered
          hover
          noBottomColumns
          data={data}
        />
      </MDBContainer>
    )
  }
}

CourseStudentsTable.propTypes = {
  students: PropTypes.array.isRequired
}