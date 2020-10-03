import React from "react"
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {withRouter} from "next/router";
import {USERS_QUERY} from "./queries";
import Link from "next/link";

class UsersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.router.push({
        pathname: '/users',
        query: {
          search: this.state.query
        }
      }
    )
  }

  changeHandler = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const {data: {error, loading, users}} = this.props;
    if (loading) return <Loader/>

    if (error) return <h1>{error.message}</h1>

    const userList = users.map(
      ({firstName, lastName, email, phone}, key) => {
        return (
          <tr key={key}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
              <MDBBtn size={"sm"} className={"rounded-pill"} color={"light-green"} outline>
                <MDBIcon icon={"edit"}/>
              </MDBBtn>
            </td>
          </tr>
        )
      }
    )
    return (
      <MDBContainer fluid className={"px-4"}>
        <h1>Users</h1>
        <MDBContainer>
          <Link href={'/users/add'}>
            <a>
              <MDBBtn color={"light-green"} className={"rounded-pill"}>
                ADD USER
                <MDBIcon icon={"user-plus"} className={"mx-3"}/>
              </MDBBtn>
            </a>
          </Link>
        </MDBContainer>
        <form onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol size={"12"} md={"8"}>
              <MDBInput label={"Search by either Phone Number or Email or Name of User"} group required
                        value={this.state.query}
                        onChange={this.changeHandler}/>
            </MDBCol>
            <MDBCol size={"12"} md={"4"} className={"text-center"}>
              <MDBBtn color={"light-green"} type={"submit"} className={"rounded-pill"} outline>
                <MDBIcon icon={'search'} className={"mx-2"}/>
                SEARCH
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
        <MDBContainer>
          <MDBTable responsiveMd>
            <MDBTableHead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {userList}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </MDBContainer>
    )
  }
}

export default withRouter(
  graphql(
    USERS_QUERY,
    {
      options: (props) => {
        const {search} = props.router.query;
        return {
          variables: {
            query: search
          }
        }
      }
    })(UsersPage))