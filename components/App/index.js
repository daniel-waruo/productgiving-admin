import React from 'react';
import Router from 'next/router'
import cookie from 'js-cookie'
import Loader from "../Loader";

export const redirect = (href = '/', noAuth = false) => {
  if (typeof window !== "undefined") {
    if (noAuth) {
      // remove the token
      cookie.remove("token");
      // redirect to login
      Router.push({
          pathname: href,
          query: {
            next: Router.asPath
          }
        }
      )
      return <Loader fullScreen={true}/>
    }
    // redirect to login
    Router.push(href);
  }
  return <Loader fullScreen={true}/>
};
