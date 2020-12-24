import React from "react"
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import {withRouter} from "next/router";
import {READY_DELIVERY_LIST_QUERY} from "./queries";
import DeliverySection from "../DeliveryListPage/components/DeliverySection";

class ReadyDeliveryListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search,
      hasMore:true
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
  loadMore = (fromItem) =>{
    const {search} = this.props.router.query;
    this.props.data.fetchMore({
      variables: {
        query: search,
        number:10,
        fromItem
      },
      // concatenate old and new entries
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const addedCampaigns = fetchMoreResult.readyCampaigns;
        if (addedCampaigns.length < 1){
          this.setState({hasMore:false})
        }
        return { readyCampaigns: [...previousResult.readyCampaigns,...addedCampaigns]}
      },
    });
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
        {this.state.hasMore ?
          (<MDBCol size="12" className="mt-2 mb-2 pt-3 text-center">
            <MDBBtn
              onClick={()=>this.loadMore(campaigns.length)}
              color={"white"}
              className={"rounded-pill mt-5"} >
              Load More
              <MDBIcon icon={'angle-down'} className={"mx-2"}/>
            </MDBBtn>
          </MDBCol>):null
        }
      </MDBContainer>
    )
  }
}

export default withRouter(
  graphql(
    READY_DELIVERY_LIST_QUERY,
    {
      options: (props) => {
        const {search} = props.router.query;
        return {
          variables: {
            query: search,
            number:10,
            fromItem:0
          }
        }
      }
    }
  )(ReadyDeliveryListPage)
)
