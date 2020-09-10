import "./Error.js";

if (typeof HTMLElement !== "undefined") {
  const { LitElement, html } = require("lit-element");

  class BalanceDisplay extends LitElement {
    static get properties() {
      return {
        customerId: { attribute: true },
        balance: { type: String },
        errorMessage: { type: String },
      };
    }

    constructor() {
      super();
      this.balance = "$45.50";
      this.styles = dwolla.styles();

      this.errorMessage = "";
    }

    firstUpdated(changedProperties) { 
        // this.fetchBalance();
    }

    fetchBalance() {
        console.log("fetching it");
      if (this.validate()) {
        dwolla
          .get(`customers/${this.customerId}/funding-sources?removed=false&embed=balance`)
          .then((res) => {
            if (res && res._embedded) {
              this.handleSuccess(res._embedded);
            } else {
              this.handleError(res.message);
            }
          });
      }
    }

    handleSuccess(embedded) {
      let balance = embedded["funding-sources"][0]._embedded.balance.balance.value;
      this.balance = `$ ${balance}`;
      this.errorMessage = "";
    }

    handleError(msg) {
      this.successMessage = "";
      this.errorMessage = msg;
    }

    validate() {
      if (!this.customerId) {
        this.errorMessage = "No customer specified.";
        return false;
      }
      return true;
    }

    render() {
      return html` <link rel="stylesheet" href="${this.styles}" />
        <div class="dwolla-balance">
          <dwolla-error message="${this.errorMessage}"></dwolla-error>
          <div class="dwolla-balance-display">
            <span>${this.balance}<span/>
          </div>
        </div>`;
    }
  }

  customElements.define("dwolla-balance-display", BalanceDisplay);
}
