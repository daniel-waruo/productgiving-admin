import React, {PureComponent} from 'react'
import HomeLanding from "./components/HomeLanding";
import {graphql} from "react-apollo";
import {APP_QUERY} from "../app/queries";
import Loader from '../Loader'
import HomeUserPage from "./components/HomeUserPage";
import {NextSeo} from "next-seo";

class HomePage extends PureComponent {
  render() {
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props
    if (loading)
      return <Loader/>
    if (error)
      return <h1>{error.message}</h1>
    if (user)
      return (
        <>
          <NextSeo title={"Member"}/>
          <HomeUserPage/>
        </>
      )
    return (
      <>
        <NextSeo title={"Member"}/>
        <HomeLanding/>
      </>
    )
  }
}

export default graphql(
  APP_QUERY
)(HomePage);
