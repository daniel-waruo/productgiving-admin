import React from 'react'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {APP_QUERY} from "../app/queries";
import {USER_SUBSCRIPTIONS_QUERY} from "./queries";
import UserSubscriptionListSection from "./UserSubscriptionListSection";
import compose from "lodash.flowright"

class SubscriberSubscriptionsPage extends React.PureComponent {

  render() {
    const {data: {loading, error, user}} = this.props;

    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return <h1>{error.message}</h1>;

    return (
      <>
        <UserSubscriptionListSection userSubscriptions={user.userSubscriptions}/>
      </>
    )
  };
}

export default compose(
  graphql(APP_QUERY),
  graphql(USER_SUBSCRIPTIONS_QUERY)
)(SubscriberSubscriptionsPage);