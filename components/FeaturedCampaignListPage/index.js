import React from "react"
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {withRouter} from "next/router";
import {FEATURED_CAMPAIGNS_QUERY} from "./queries";
import Link from "next/link";
import BoolIcon from "../BoolIcon";

class FeaturedCampaignListPage extends React.PureComponent {
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
        pathname: '/campaigns/featured',
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
        const addedCampaigns = fetchMoreResult.featuredCampaigns;
        if (addedCampaigns.length < 1){
          this.setState({hasMore:false})
        }
        return { featuredCampaigns: [...previousResult.featuredCampaigns,...addedCampaigns]}
      },
    });
  }
  render() {
    const {data: {error, loading, featuredCampaigns:campaigns}} = this.props;
    if (loading) return <Loader/>

    if (error) return <h1>{error.message}</h1>

    return (
      <MDBContainer className={"px-4 pt-4"}>
        <h1>Featured Campaigns</h1>
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
        <MDBContainer>
          <MDBTable responsive>
            <MDBTableHead>
              <tr>
                <th colSpan={"2"}>Name</th>
                <th>Is Featured</th>
                <th>Is Approved</th>
                <th/>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                campaigns.map(
                  ({id, name, isApproved,isFeatured, image}, key) => {
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
                        <td><BoolIcon bool={isFeatured}/></td>
                        <td><BoolIcon bool={isApproved}/></td>
                        <td>
                          <Link href={"/campaigns/[id]"} as={`/campaigns/${id}`}>
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
      </MDBContainer>
    )
  }
}

export default withRouter(
  graphql(
    FEATURED_CAMPAIGNS_QUERY,
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
    })(FeaturedCampaignListPage))
