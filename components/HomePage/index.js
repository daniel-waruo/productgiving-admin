import React, {PureComponent} from 'react'
import HomeLanding from "./HomeLanding";
import {graphql} from "react-apollo";
import {APP_QUERY} from "../app/queries";
import Loader from '../Loader'
import HomeUserPage from "./HomeUserPage";

class HomePage extends PureComponent {
  render() {
    const {
      data: {
        loading,
        error,
        user,
        messages
      }
    } = this.props
    if (loading)
      return <Loader/>
    if (error)
      return <h1>{error.message}</h1>
    if (user)
      return <HomeUserPage/>
    return <HomeLanding/>
  }
}

export default graphql(
  APP_QUERY
)(HomePage);
