# `@dwolla/dwolla-react`

The Dwolla React SDK allows you to interact with Dwolla within your React app.

Features include:

- Client-side API client
- Drop-in React components

```javascript
import dwolla, { DocumentUpload } from "@dwolla/dwolla-react";

dwolla.configure({
  fetchToken: () =>
    fetch("https://myapp.com/get_dwolla_token")
      .then((res) => res.json())
      .then((body) => body.token),
});

render(<DocumentUpload />);
```
