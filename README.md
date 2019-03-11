<p align="center">
  <img alt="Lorikeet" src="https://user-images.githubusercontent.com/36158/54131653-afb8db00-440a-11e9-8ae8-a5ec5cd045b2.png">
</p>

## Overview

Lorikeet is a design system and toolkit library used interfaces for the decentralized web.

## Getting Started

### Quick setup

Install it from npm:

```sh
npm install --save @lorikeet/ui
```

Copy its assets into your public directory:

```sh
npx lorikeet copy-assets ./public
```

Wrap your app with the `Main` component:

```jsx
import { Main } from '@lorikeet/ui'

const App = () => (
  <Main>
    <h1>Your App</h1>
  </Main>
)
```

*Your project is now ready to use Lorikeet! 🦜*

### Assets

Lorikeet require some assets (e.g. fonts) in order to work properly. These need to be copied where they can be accessed by the library, like the `public/` directory of a project using [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-assets-outside-of-the-module-system).

Copy these assets using the provided `lorikeet copy-assets` command:

```sh
npx lorikeet copy-assets ./public
```

By default, it will create a directory named `lorikeet` in the specified directory.

This emplacement is communicated to the library through the `<Main>` component. The default path is `./lorikeet/`, but you can change it using the `assetsUrl` prop:

```jsx
import { Main } from '@lorikeet/ui'

const App = () => (
  <Main assetsUrl="http://example.com/lorikeet-assets/">
    <h1>Your App</h1>
  </Main>
)
```

You may also want to add it as a build step in your project, so that Lorikeet can be upgraded without having to worry about it.

```json
"scripts": {
  "sync-assets": "lorikeet copy-assets ./public",
  "build": "npm run sync-assets && react-scripts build",
  "start": "npm run sync-assets && react-scripts start"
}
```

See `lorikeet -h` for more information.

## Build & Develop

Clone this repository, install the dependencies:

```sh
npm install
```

Build:

```sh
npm run build
```

Auto rebuild:

```sh
npm run dev
```

Run the devbox (to develop a component in isolation):

```sh
cd devbox
npm install
npm start
```

## License

MIT, see [LICENSE](LICENSE).
