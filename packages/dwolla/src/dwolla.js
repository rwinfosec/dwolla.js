let _config = {
  environment: "",
  fetchToken: () => Promise.reject("Please call dwolla.configure(...)"),
};

const dwolla = {
  configure(config) {
    _config = { ...config };
  },

  async post() {
    const token = await _config.fetchToken();
    alert(`environment: ${_config.environment} -- token: ${token}`);
  },
};

export default dwolla;

if (typeof window !== "undefined") {
  window.dwolla = dwolla;
}
