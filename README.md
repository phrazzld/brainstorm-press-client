# Brainstorm Press (Client) 🧠 ⚡

Brainstorm Press is a blogging platform with payments enabled by the Bitcoin Lightning Network.

[![GitHub license](https://img.shields.io/github/license/phrazzld/brainstorm-press-express-api)](https://github.com/phrazzld/brainstorm-press-express-api/blob/master/LICENSE)

## Technologies 🛠️

- React
- TypeScript
- WebSocket
- Zustand
- Bitcoin
- Lightning
- Draft JS

The Brainstorm Press client is built with React and TypeScript. Zustand is used to manage application state.

Corresponding API code [here](https://github.com/phrazzld/brainstorm-press-express-api).

## Testing 🧪

`yarn test` will run unit and integration tests built with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

`node_modules/.bin/cypress open` will run end-to-end tests built with [Cypress](https://www.cypress.io/).

End-to-end tests depend on network access to the MongoDB Atlas cluster, as well as a locally running instance of Brainstorm Press's API and a locally running Lightning Network (like [Polar](https://lightningpolar.com/)).

## Production 🚀

The Brainstorm Press client is not currently live. It is intended to be hosted with Firebase Hosting.

## Acknowledgements 🙌

This project is largely based on the [Lightning Labs Builder's Guide](https://docs.lightning.engineering/lapps/guides). Huge shoutout to Lightning Labs.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
