import React from 'react';
import {MainLayout} from "./components";
import {graphql} from "react-apollo";
import {APP_QUERY} from "./queries";

const LayoutWithApollo = graphql(
  APP_QUERY
)(MainLayout);

export const withApp =
  (PageComponent, config = {secure: true}) => {
    const {secure} = config;

    return props => {
      const {title} = props;
      return (
        <LayoutWithApollo secure={secure} title={title}>
          <PageComponent {...props} />
        </LayoutWithApollo>
      )
    };
  };