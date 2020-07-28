import React from 'react'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {SUBSCRIPTIONS_QUERY} from "./queries";
import SubscriptionListSection from "./SubscriptionListSection";
import compose from "lodash.flowright"
import {NextSeo} from "next-seo";
import {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";

class SubscriptionsPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.router.push({
        pathname: '/subscriber/subscriptions/add',
        query: {
          search: this.state.query
        }
      }
    )
  }
  changeHandler = e => {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const {data: {loading, error, subscriptions}} = this.props;

    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return <h1>{error.message}</h1>;

    return (
      <MDBContainer className={"pt-4"}>
        <NextSeo title={"Search Subscriptions"}/>
        <h1>Search Subscriptions</h1>
        <form onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol size={"12"} md={"8"}>
              <MDBInput label={"Search for a subscription"} group required
                        value={this.state.query}
                        onChange={this.changeHandler}/>
            </MDBCol>
            <MDBCol size={"12"} md={"4"} className={"text-center"}>
              <MDBBtn type={"submit"} className={"rounded-pill"} outline>
                <MDBIcon icon={'search'} className={"mx-2"}/>
                SEARCH
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
        <SubscriptionListSection subscriptions={subscriptions}/>
      </MDBContainer>
    )
  };
}

export default withRouter(
  compose(
    graphql(
      SUBSCRIPTIONS_QUERY,
      {
        options: (props) => {
          const {search} = props.router.query;
          return {
            variables: {
              query: search
            }
          }
        }
      })
  )(SubscriptionsPage)
);