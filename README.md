# Voting Front-End

Voting frontend is a the front end of a voting website.It uses

* [Apollo](https://www.apollographql.com/client/) a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.


We integrate Apollo seamlessly with Next by wrapping our `pages/**` inside a [higher-order component (HOC)](https://facebook.github.io/react/docs/higher-order-components.html). Using the HOC pattern we're able to pass down a central store of query result data created by Apollo into our React component hierarchy defined inside each page of our Next application.

On initial page load, while on the server and inside `getInitialProps`, we invoke the Apollo method, [`getDataFromTree`](https://www.apollographql.com/docs/react/api/react-ssr/#getdatafromtree). This method returns a promise; at the point in which the promise resolves, our Apollo Client store is completely initialized.


### Prerequisites
* node
* npm

### Get the repository

Clone the repository:

```bash
git clone https://github.com/daniel-waruo/voting-frontend.git
cd voting-frontend
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```
##Disclaimer
If you don't have the local version of the backend server change url to [https://api-voting.herokuapp.com/](https://api-voting.herokuapp.com/).
