import {ApolloClient} from 'apollo-client'
import {ApolloLink, concat} from 'apollo-link';

import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies'
import cookie from 'js-cookie';
import {initCache} from './lib/init-cache'
import resolvers from "./resolvers";
import types from "./types"
import {GRAPHQL_ENDPOINT} from "../_constants";
import {HttpLink} from "apollo-link-http";

global.fetch = fetch;


export default function createApolloClient(initialState, ctx) {
  // batch Http Link object
  let link = new HttpLink({
    uri: GRAPHQL_ENDPOINT, // set graphql endpoint
    credentials: 'include',// set credentials like include
    connectToDevTools: process.env.NODE_ENV !== 'production', // if in development connect to Dev tools
    queryDeduplication: true, // set query deduplication to true
  });

  // create an authentication middleware
  const authMiddleware = new ApolloLink((operation, forward) => {
    // get the authorization token from cookies
    let token = cookie.get('token');

    // if in server environment
    if (Boolean(ctx)) {
      // get token from cookie in request
      token = nextCookie(ctx).token;
    }
    // set request headers
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        authorization: token ? `Token ${token}` : "",
      }
    }));
    return forward(operation);
  });

  // combine middleware
  link = concat(authMiddleware, link)

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    cache: initCache(initialState),
    shouldBatch: false,
    link,
    typeDefs: types,
    resolvers
  });
}
