# Brainstorm Press (Client)

Brainstorm Press is a blogging platform with payments enabled by the Bitcoin Lightning Network.

[![GitHub license](https://img.shields.io/github/license/phrazzld/brainstorm-press-express-api)](https://github.com/phrazzld/brainstorm-press-express-api/blob/master/LICENSE)

The Brainstorm Press client is built with React and TypeScript. [Zustand](https://github.com/pmndrs/zustand) is used to manage application state.

Corresponding API code [here](https://github.com/phrazzld/brainstorm-press-express-api).

## Testing

`yarn test` will run unit and integration tests built with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

`node_modules/.bin/cypress open` will run end-to-end tests built with [Cypress](https://www.cypress.io/).

End-to-end tests depend on network access to the MongoDB Atlas cluster, as well as a locally running instance of Brainstorm Press's API and a locally running Lightning Network (like [Polar](https://lightningpolar.com/)).

## Production

The Brainstorm Press client is currently live at [brainstorm-press-client.web.app](https://brainstorm-press-client.web.app). It is hosted with Firebase Hosting.

## Acknowledgements

This project is largely based on the [Lightning Labs Builder's Guide](https://docs.lightning.engineering/lapps/guides). Huge shoutout to Lightning Labs.
