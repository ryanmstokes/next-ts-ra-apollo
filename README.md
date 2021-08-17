## !!! THIS PROJECT IS UNDER CONSTRUCTION - Use at your own risk! 

# NEXT-TYPED-APOLLO-RA

This project is an example of how to use the [React Admin](https://marmelab.com/react-admin/) dataProvider to inject graphQL queried data via [Apollo Client](https://www.apollographql.com/docs/react/) into the RA dashboard. The Example shows how to Paginate, Order, Sort and Filter data.

### The project is built using Typescript, NextJS/React, React Admin, Apollo Client, GraphQL, React Testing Library, Jest and Cypress.
----------------------------------------------------------------------------------------------


## Getting Started

### Dev:

```bash
yarn dev
```
Open [http://localhost:3010](http://localhost:3010) with your browser to see the result.

### Unit test:
```bash
yarn test
```

### e2e test:
```bash
yarn e2etest
```

### Production:
```bash
yarn Build
```

## DATA

The data is taken from the Open graphQL of Space X: https://api.spacex.land/graphql/

React Admin uses a dataProvider.ts file as a type of API adapter mapping calls to different functions that resolve promises and return data (or errors). 

### See https://marmelab.com/react-admin/DataProviders.html for more info on dataProviders

See "/react-admin/provider.ts" to see how getList will perform a Apollo Client query and return the data to React Admin.

The past missions are display in using a Data Grid template component (*see "/components/missions"), allowing the user to search, sort, order and filter the data within the table that React Admin generates.

