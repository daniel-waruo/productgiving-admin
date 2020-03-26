import {InMemoryCache} from 'apollo-cache-inmemory'
import {initialClientStateCache} from './initial-client-state';


export const initCache = (initialState) => {
  const cache = new InMemoryCache(
    {
      cacheRedirects: {
        Query: {
          candidate: (_, args, {getCacheKey}) => {
            getCacheKey({__typename: 'CandidateType', id: args.id})
          }
        },
      },
    }
  ).restore(initialState);

  // This is the part where the initial client-state data is set:
  cache.writeData({
    data: initialClientStateCache, // write initial client-state data
  });

  return cache
};