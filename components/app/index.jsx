import React from 'react';
import MainLayout from "./components";

export const withApp =
  (PageComponent, config = {secure: true}) => {
    const {secure} = config;

    return props => {
      const {title} = props;
      return (
        <MainLayout secure={secure} title={title}>
          <PageComponent {...props} />
        </MainLayout>
      )
    };
  };