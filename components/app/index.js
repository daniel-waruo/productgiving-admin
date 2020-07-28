import React from 'react';
import MainLayout from "./components/MemberLayout";
import PaymentLayout from "./components/SubscriberLayout";
import DefaultLayout from "./components/DefaultLayout";

export const withMemberLayout =
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

export const withSubscriberLayout =
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


export const withDefaultLayout =
  (PageComponent, config = {secure: true}) => {
    const {secure} = config;

    return props => {
      const {title} = props;
      return (
        <DefaultLayout secure={secure} title={title}>
          <PageComponent {...props} />
        </DefaultLayout>
      )
    };
  };