import React from 'react';
import MainLayout from "./MainLayout";

export const withMainLayout =
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
