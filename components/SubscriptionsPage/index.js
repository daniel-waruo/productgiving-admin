import React from 'react'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {APP_QUERY} from "../app/queries";
import {SUBSCRIPTIONS_QUERY} from "./queries";
import SubscriptionListSection from "./SubscriptionListSection";
import compose from "lodash.flowright"
import {NextSeo} from "next-seo";

class SubscriptionsPage extends React.PureComponent {

  render() {
    const {data: {loading, error, user}} = this.props;

    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return <h1>{error.message}</h1>;

    return (
      <>
        <NextSeo title={"Subscriptions"}/>
        <SubscriptionListSection subscriptions={user.subscriptions}/>
      </>
    )
  };
}

export default compose(
  graphql(APP_QUERY),
  graphql(SUBSCRIPTIONS_QUERY)
)(SubscriptionsPage);