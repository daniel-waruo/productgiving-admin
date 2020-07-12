import React from 'react';
import MainLayout from "./components/MainLayout";
import PaymentLayout from "./components/PaymentLayout";

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

export const withStudentApp =
  (PageComponent, config = {secure: true}) => {
    const {secure} = config;

    return props => {
      const {title} = props;
      return (
        <PaymentLayout secure={secure} title={title}>
          <PageComponent {...props} />
        </PaymentLayout>
      )
    };
  };
