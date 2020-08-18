# Dwolla.js

This repo contains JavaScript packages for using Dwolla with various platforms and/or frameworks.

Tools used:

- [Yarn](https://yarnpkg.com/)
- [Lerna](https://github.com/lerna/lerna)
- [Webpack](https://webpack.js.org/)

### Getting Started

```
yarn
yarn bootstrap
yarn build
yarn dev
```

## `@dwolla/dwolla`

```javascript
import Dwolla from "@dwolla/dwolla";

// server-side
const dwolla = Dwolla({
  key: "my_dwolla_app_key",
  secret: "my_dwolla_app_secret",
  environment: "sandbox",
});
```

or...

```javascript
// client-side
const dwolla = Dwolla({
  fetchToken: () =>
    fetch("https://myapp.com/get_dwolla_token")
      .then((res) => res.json())
      .then((body) => body.token),
});
```

Once you've created a `Dwolla` client you can make requests:

```javascript
const customer = await dwolla.customers.createReceiveOnly({
  firstName: "Alex",
  lastName: "Smith",
  email: "asmith@gmail.com",
});
```

## `@dwolla/dwolla-components`

```html
<html>
  <head>
    <script src="https://cdn.dwolla.com/v2/dwolla.js"></script>
    <script src="https://cdn.dwolla.com/v2/dwolla-components/document-upload.js"></script>
  </head>
  <body>
    <dwolla-document-upload />

    <script type="text/javascript">
      Dwolla({
        fetchToken: () =>
          fetch("https://myapp.com/get_dwolla_token")
            .then((res) => res.json())
            .then((body) => body.token),
      });
    </script>
  </body>
</html>
```

## `@dwolla/dwolla-react`

```javascript
import Dwolla from "@dwolla/dwolla";
import { Provider, DocumentUpload } from "@dwolla/dwolla-react";

const dwolla = Dwolla({
  fetchToken: () =>
    fetch("https://myapp.com/get_dwolla_token")
      .then((res) => res.json())
      .then((body) => body.token),
});

render(
  <Provider dwolla={dwolla}>
    <DocumentUpload />
  </Provider>
);
```
