const DWOLLA_CONTENT_TYPE = "application/vnd.dwolla.v1.hal+json";
const CLIENT_TOKEN_ACTIONS = {
  CustomerDocumentsCreate: "customer.documents.create",
};
const ENVIRONMENT = {
  local: "http://localhost:17188",
  sandbox: "https://api-sandbox.dwolla.com",
  production: "https://api.dwolla.com",
};

let _config = {
  environment: "",
  styles: "",
  token: () => Promise.reject(new Error("Please call dwolla.configure(...)")),
  success: (res) => Promise(res),
  error: (err) => Promise(err),
};

const dwolla = {
  configure(config) {
    _config = { ...config };
  },

  post(url, data) {
    return _config.token().then((token) => {
      return fetch(`${ENVIRONMENT[_config.environment]}/${url}`, {
        method: "POST",
        mode: "cors",
        body: data,
        headers: {
          "Content-Type": DWOLLA_CONTENT_TYPE,
          Accept: DWOLLA_CONTENT_TYPE,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log("Success:", result);
          _config.success(result);
          return result;
        })
        .catch((error) => {
          console.error("Error:", error);
          _config.error(error);
          return error;
        });
    });
  },

<<<<<<< HEAD
  generateClientToken(action, resourceId) {
    this.post("client-tokens", {
      action,
      _links: this._generateLinksFor(action, resourceId),
=======

  get(url) {
    return _config.token().then(token => {
      return fetch(`${ENVIRONMENT[_config.environment]}/${url}`, {
<<<<<<< HEAD:packages/dwolla-client/src/dwolla-client.js
          credentials: 'same-origin',
=======
>>>>>>> 9655071... psimp-34: add balance display component:packages/dwolla/src/dwolla.js
          method: 'GET',
          mode: 'cors',
          headers: {
              'Accept': DWOLLA_CONTENT_TYPE,
<<<<<<< HEAD:packages/dwolla-client/src/dwolla-client.js
              'Authorization': `Bearer ${token}`
          },   
      })
      .then(response => {
        console.log('here');
        console.log('res:' + JSON.stringify(response));
        return response.json();
      })
      .then(result => {
          console.log('Success:' + JSON.stringify(result));
=======
              'Authorization': `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
          },   
      })
      .then(response => {
        return response.json();
      })
      .then(result => {
          console.log('Success:', result);
>>>>>>> 9655071... psimp-34: add balance display component:packages/dwolla/src/dwolla.js
          _config.success(result);
          return result;
      })
      .catch(error => {
<<<<<<< HEAD:packages/dwolla-client/src/dwolla-client.js
          console.error('Error:' + error);
=======
          console.error('Error:', error);
>>>>>>> 9655071... psimp-34: add balance display component:packages/dwolla/src/dwolla.js
          _config.error(error);
          return error;
      });
>>>>>>> 9a2986d... psimp-34: add balance display component
    });
  },

  _generateLinksFor(action, resourceId) {
    switch (action) {
      case CLIENT_TOKEN_ACTIONS.CustomerDocumentsCreate:
        return `${ENVIRONMENT[_config.environment]}/customers/${resourceId}`;
      default:
        return ``;
    }
  },

  styles() {
    return _config.styles;
  },
};

export default dwolla;

if (typeof window !== "undefined") {
  window.dwolla = dwolla;
}
