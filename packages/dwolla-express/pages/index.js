const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const qs = require("query-string");

const ENVIRONMENT = {
  local: "http://localhost:17188",
  sandbox: "https://api-sandbox.dwolla.com",
  production: "https://api.dwolla.com",
};
const port = 4041;
const env = "local";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");

app.get("/", function (req, res) {
  res.status(200).render(`landing`, {});
});

app.get("/upload-document", function (req, res) {
  generateAccessToken().then((a_res) => {
    generateClientToken(
      a_res.access_token,
      "customer.documents.create",
      "f8c0638a-02d1-49c8-b833-e3498edaa0cf"
    ).then((c_res) => {
      const customer = {
        id: "f8c0638a-02d1-49c8-b833-e3498edaa0cf",
        firstName: "Tom",
        lastName: "Tomson",
        email: "ttomson@dwolla.com",
      };
      res.status(200).render(`document`, { customer, token: c_res.token });
    });
  });
});

app.get("/update-customer", function (req, res) {
  generateAccessToken().then((a_res) => {
    generateClientToken(
      a_res.access_token,
      "customer.update",
      "c646e19f-b3a3-4a29-b8e4-62edab28fe3d"
    ).then((c_res) => {
      const customer = {
        id: "c646e19f-b3a3-4a29-b8e4-62edab28fe3d",
        firstName: "Jawn",
        lastName: "Dawn",
        email: "jawndow@nomail.net",
      };
      res
        .status(200)
        .render(`update-customer`, { customer, token: c_res.token });
    });
  });
});

app.get("/balance-display", function (req, res) {
  generateAccessToken().then((a_res) => {
    generateClientToken(
      a_res.access_token,
      "customer.fundingsources.read",
      "c646e19f-b3a3-4a29-b8e4-62edab28fe3d"
    ).then((c_res) => {
      const customer = {
        id: "c646e19f-b3a3-4a29-b8e4-62edab28fe3d",
        firstName: "Tom",
        lastName: "Tomson",
        email: "ttomson@dwolla.com",
      };
      res.status(200).render(`balance`, { customer, token: c_res.token });
    });
  });
});

app.get("/dwolla-web.js", function (req, res) {
  var component = path.join(
    __dirname,
    "../../../dwolla-web/dist/browser/dwolla-web.js"
  );
  res.sendFile(component);
});

app.get("/styles/:sheet", function (req, res) {
  res.sendFile(path.join(__dirname, `/static/styles/${req.params.sheet}`));
});

function generateClientToken(token, action, customerId) {
  const url = `${ENVIRONMENT[env]}/client-tokens`;
  const body = {
    action: action,
    _links: {
      customer: {
        href: `${ENVIRONMENT[env]}/customers/${customerId}`,
      },
    },
  };

  return axios
    .post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.dwolla.v1.hal+json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return "err";
    });
}

function generateAccessToken() {
  const url = `${ENVIRONMENT[env]}/token`;
  const clientId = "VabnSDwRGZ8z41fK9LnxcyyslWT5L4e4iBJVACqhpaIJeAe2Mx";
  const clientSecret = "SWgBTRFz2tn87rMwUs0IQzJEQjQMHUBmksmBydsa3KscsVoAN4";
  const authHeader =
    "Basic " +
    new Buffer(clientId + ":" + clientSecret, "UTF-8").toString("base64");

  return axios
    .post(url, qs.stringify({ grant_type: "client_credentials" }), {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return "err";
    });
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
