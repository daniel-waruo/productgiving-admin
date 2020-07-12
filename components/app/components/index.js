import React from 'react';
import Router from 'next/router'
import cookie from 'js-cookie'

export const redirectNoUser = () => {
  if (typeof window !== "undefined") {
    // remove the token
    cookie.remove("token");
    // redirect to login
    Router.push("/login");
  }
  return <h3 className={"text-center"}>User not Authenticated Redirecting to Login</h3>;
};
