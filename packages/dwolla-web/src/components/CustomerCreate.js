import "./Error";
import "./Success";

if (typeof HTMLElement !== "undefined") {
    const { LitElement, html } = require("lit-element");
  
    class CustomerCreate extends LitElement {
      static get properties() {
        return {
          customerId: { attribute: true },
          terms: { attribute: true },
          privacy: { attribute: true },
          successMessage: { type: String },
          errorMessage: { type: String },
        };
      }
  
      constructor() {
        super();
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
        this.styles = dwolla.styles();
        this.firstName = {name: 'First Name', value: ''};
        this.lastName = {name: 'Last Name', value: ''};
        this.email = {name: 'Email', value: '', regex: emailRegex, regexError: `Field 'Email' must be a valid email address.`};
        this.agreed = {name: 'Terms Checkbox', value: '', error: 'You must agree to the Terms of Service and Privacy Policy before continuing.'};
        this.terms = "";
        this.privacy = "";
        
        this.successMessage = "";
        this.errorMessage = "";
        this.isLoading = "";
      }
  
      handleSubmit() {
        if (this.validate()) {
          this.isLoading = "dwolla-loading";
          let data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          }
          
          dwolla
            .post(`customers`, JSON.stringify(data), 'application/vnd.dwolla.v1.hal+json')
            .then((res) => {
              this.isLoading = "";
              if (res && res._links) {
                this.handleSuccess();
              } else {
                this.handleError(res);
              }
            });
        }
      }
  
      handleInput(e) {
        this[e.target.name].value = e.target.value;
      }
  
      handleSuccess() {
        this.successMessage = "Customer Successfully Created.";
        this.errorMessage = "";
      }
  
      handleError(res) {
        this.successMessage = "";
        this.errorMessage = res.message;
      }
  
      validate() {
        return this.validateField('firstName') && this.validateField('lastName') && this.validateField('email') && this.validateField('agreed');
      }
  
      validateField(field) {
        let property = this[field];
        if(!property.value) {
          this.errorMessage = property.error || `Field '${property.name}' must have a value.`;
          return false;
        } else if (property.regex && !property.regex.test(property.value)) {
          this.errorMessage = property.regexError;
          return false;
        }
        else {
          this.errorMessage = ``;
          return true;
        }
      }
  
      render() {
        return html`
          <link rel="stylesheet" href="${this.styles}">
          <div id="dwolla-customer-update">
              <dwolla-success message="${this.successMessage}"></dwolla-success>
              <dwolla-error message="${this.errorMessage}"></dwolla-error>
  
              <div class="dwolla-input-container">
                <label for="firstName">First Name</label>
                <input name="firstName" class="dwolla-customer-input dwolla-customer-firstName" type="text" placeholder="Legal First Name" @change="${this.handleInput}" />
              </div>

              <div class="dwolla-input-container">
                <label for="lastName">Last Name</label>
                <input name="lastName" class="dwolla-customer-input dwolla-customer-lastName" type="text" placeholder="Legal Last Name" @change="${this.handleInput}" />
              </div>

              <div class="dwolla-input-container">
                <label for="email">Email</label>
                <input name="email" class="dwolla-customer-input dwolla-customer-email" type="text" placeholder="Email" @change="${this.handleInput}" />
              </div>
  
            <div class="dwolla-customer-tos">
              <div class="dwolla-customer-checkbox">  
                <input type="checkbox" id="dwolla-check" name="agreed" value="agree" @change="${this.handleInput}">
              </div>
              <span class="dwolla-customer-text">
                By checking this box you agree to <a class="dwolla-link" href="${this.terms}" target="_blank">Our Terms of Service</a> and <a class="dwolla-link" href="${this.privacy}" target="_blank">Privacy Policy</a> as well as our Partner <a class="dwolla-link" href="https://www.dwolla.com/legal/tos/" target="_blank">Dwolla’s Terms of Service</a> and <a class="dwolla-link" href="https://www.dwolla.com/legal/privacy/" target="_blank">Privacy Policy</a>
              </span>
            </div>
            <div class="dwolla-submit dwolla-customer-submit">
              <input class="${this.isLoading}" type="submit" value="Agree & Continue" @click="${this.handleSubmit}" />
            </div>
          </div>`;
      }
    }
  
    customElements.define("dwolla-customer-create", CustomerCreate);
  }
  