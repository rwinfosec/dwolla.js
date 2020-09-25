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

  generateClientToken(action, resourceId) {
    this.post("client-tokens", {
      action,
      _links: this._generateLinksFor(action, resourceId),
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
