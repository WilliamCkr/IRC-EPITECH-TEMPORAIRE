import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { gql } from '@apollo/client';


import fetch from 'cross-fetch';
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8000/', fetch }),
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/',
//   cache: new InMemoryCache()
// });

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));
