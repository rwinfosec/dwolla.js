# `@dwolla/dwolla-web`

The Dwolla Web SDK allows you to interact with Dwolla from a web browser. Features include:

- Client-side API client
- Drop-in components

The SDK is available via the Dwolla CDN:

```html
<html>
  <head>
    <script src="//cdn.dwolla.com/v2-alpha/dwolla-web.js"></script>
  </head>
  <body>
    <dwolla-document-upload />

    <script type="text/javascript">
      dwolla.configure({
        fetchToken: () =>
          fetch("https://myapp.com/get_dwolla_token", { method: "post" })
            .then((res) => res.json())
            .then((body) => body.token),
      });
    </script>
  </body>
</html>
```

As well as via NPM:

```
npm install @dwolla/dwolla-web
```

```javascript
import dwolla from "@dwolla/dwolla-web";

dwolla.configure({
  fetchToken: () =>
    fetch("https://myapp.com/get_dwolla_token", { method: "post" })
      .then((res) => res.json())
      .then((body) => body.token),
});
```
