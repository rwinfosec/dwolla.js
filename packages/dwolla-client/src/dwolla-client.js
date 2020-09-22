const DWOLLA_CONTENT_TYPE = 'application/vnd.dwolla.v1.hal+json';
const ENVIRONMENT = {
  'local': 'http://localhost:17188',
  'sandbox': 'https://api-sandbox.dwolla.com',
  'production': 'https://api.dwolla.com'
};

let _config = {
  environment: "",
  styles: "",
  token: () => Promise.reject("Please call dwolla.configure(...)"),
  success: (res) => Promise(res),
  error: (err) => Promise(err)
};

const dwolla = {
  configure(config) {
    _config = { ...config };
  },

  post(url, data, contentType) {   
    return _config.token().then(token => {
      let headers = {
        'Accept': DWOLLA_CONTENT_TYPE,
        'Authorization': `Bearer ${token}`
      };
      if(contentType) { headers['Content-Type'] = contentType };
      return fetch(`${ENVIRONMENT[_config.environment]}/${url}`, {
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          body: data,
          headers   
      })
      .then(response => {
        return response.json();
      })
      .then(result => {
          console.log('Success:', result);
          _config.success(result);
          return result;
      })
      .catch(error => {
          console.error('Error:', error);
          _config.error(error);
          return error;
      });
    });
  },


  get(url) {
    return _config.token().then(token => {
      return fetch(`${ENVIRONMENT[_config.environment]}/${url}`, {
          credentials: 'same-origin',
          method: 'GET',
          mode: 'cors',
          headers: {
              'Accept': DWOLLA_CONTENT_TYPE,
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
          _config.success(result);
          return result;
      })
      .catch(error => {
          console.error('Error:' + error);
          _config.error(error);
          return error;
      });
    });
  },

  styles() {
    return _config.styles;
  }
};

export default dwolla;

if (typeof window !== "undefined") {
  window.dwolla = dwolla;
}
