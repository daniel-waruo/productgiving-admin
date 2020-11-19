import React from "react"
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import {withRouter} from "next/router";
import {DELIVERY_LIST_QUERY} from "./queries";
import DeliverySection from "../DeliveryListPage/components/DeliverySection";

class ReadyDeliveryListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.router.push({
        pathname: '/deliveries/state/ready',
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
    const {data: {error, loading, readyCampaigns: campaigns}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;
    return (
      <MDBContainer className={"px-4 pt-4"}>
        <h1>Ready Deliveries</h1>
        <form onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol size={"12"} md={"8"}>
              <MDBInput label={"Search"} group
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
        <DeliverySection campaigns={campaigns}/>
      </MDBContainer>
    )
  }
}

export default withRouter(
  graphql(
    DELIVERY_LIST_QUERY,
    {
      options: (props) => {
        const {search} = props.router.query;
        return {
          variables: {
            query: search
          }
        }
      }
    }
  )(ReadyDeliveryListPage)
)