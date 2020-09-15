import "./Error";
import "./Success";

if (typeof HTMLElement !== "undefined") {
  const { LitElement, html } = require("lit-element");

  class CustomerUpdate extends LitElement {
    static get properties() {
      return {
        customerId: { attribute: true },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        terms: { attribute: true },
        privacy: { attribute: true },
        successMessage: { type: String },
        errorMessage: { type: String },
        isLoading: { type: String },
      };
    }

    constructor() {
      super();
      const stateRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
      const postalCodeRegex = /^\d{5}(-\d{4})?$/;
      const dobRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
      const ssnRegex = /^(\d{4}|\d{9})$/;

      this.styles = dwolla.styles();
      this.address1 = { name: "Address 1", value: "" };
      this.address2 = { name: "Address 2", value: "" };
      this.city = { name: "City", value: "" };
      this.state = {
        name: "State",
        value: "",
        regex: stateRegex,
        regexError: `Field 'State' must be a valid two letter abbreviation.`,
      };
      this.postalCode = {
        name: "Postal Code",
        value: "",
        regex: postalCodeRegex,
        regexError: `Field 'Postal Code' must be a 5 digit ZIP or a 5 digit ZIP plus 4.`,
      };
      this.dob = {
        name: "Date Of Birth",
        value: "",
        regex: dobRegex,
        regexError: `Field 'Date Of Birth' must be of the format YYYY-MM-DD.`,
      };
      this.ssn = {
        name: "SSN",
        value: "",
        regex: ssnRegex,
        regexError: `Field 'SSN' must be 4 or 9 digits.`,
      };
      this.agreed = {
        name: "Terms Checkbox",
        value: "",
        error:
          "You must agree to the Terms of Service and Privacy Policy before continuing.",
      };
      this.terms = "";
      this.privacy = "";

      this.successMessage = "";
      this.errorMessage = "";
      this.isLoading = "";
    }

    handleSubmit() {
      if (this.validate()) {
        this.isLoading = "dwolla-loading";
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          address1: this.address1.value,
          address2: this.address2.value,
          city: this.city.value,
          state: this.state.value,
          postalCode: this.postalCode.value,
          dateOfBirth: this.dob.value,
          ssn: this.ssn.value,
        };

        dwolla
          .post(
            `customers/${this.customerId}`,
            JSON.stringify(data),
            "application/vnd.dwolla.v1.hal+json"
          )
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
      this.successMessage = "Customer Successfully Updated.";
      this.errorMessage = "";
    }

    handleError(res) {
      this.successMessage = "";
      this.errorMessage = res.message;
    }

    validate() {
      return (
        this.validateField("address1") &&
        this.validateField("city") &&
        this.validateField("state") &&
        this.validateField("postalCode") &&
        this.validateField("dob") &&
        this.validateField("ssn") &&
        this.validateField("agreed")
      );
    }

    validateField(field) {
      const property = this[field];
      if (!property.value) {
        this.errorMessage =
          property.error || `Field '${property.name}' must have a value.`;
        return false;
      } else if (property.regex && !property.regex.test(property.value)) {
        this.errorMessage = property.regexError;
        return false;
      } else {
        this.errorMessage = ``;
        return true;
      }
    }

    render() {
      return html` <link rel="stylesheet" href="${this.styles}" />
        <div id="dwolla-customer-update">
          <dwolla-success message="${this.successMessage}"></dwolla-success>
          <dwolla-error message="${this.errorMessage}"></dwolla-error>

          <div class="dwolla-input-container">
            <label for="firstName">First Name</label>
            <input
              id="firstName"
              class="dwolla-customer-input dwolla-customer-firstName"
              type="text"
              placeholder="First Name"
              value=${this.firstName}
              readonly
            />
          </div>

          <div class="dwolla-input-container">
            <label for="lastName">Last Name</label>
            <input
              id="lastName"
              class="dwolla-customer-input dwolla-customer-lastName"
              type="text"
              placeholder="Last Name"
              value=${this.lastName}
              readonly
            />
          </div>

          <div class="dwolla-input-container">
            <label for="email">Email</label>
            <input
              id="email"
              class="dwolla-customer-input dwolla-customer-email"
              type="text"
              placeholder="Email"
              value=${this.email}
              readonly
            />
          </div>

          <div class="dwolla-input-container">
            <label for="address1">Address 1</label>
            <input
              id="address1"
              name="address1"
              class="dwolla-customer-input dwolla-customer-address1"
              type="text"
              placeholder="Address 1"
              @change="${this.handleInput}"
            />
          </div>

          <div class="dwolla-input-container">
            <label for="address2">Address 2</label>
            <input
              id="address2"
              name="address2"
              class="dwolla-customer-input dwolla-customer-address2"
              type="text"
              placeholder="Address 2"
              @change="${this.handleInput}"
            />
          </div>

          <div class="dwolla-input-container">
            <label for="city">City</label>
            <input
              id="city"
              name="city"
              class="dwolla-customer-input dwolla-customer-city"
              type="text"
              placeholder="City"
              @change="${this.handleInput}"
            />
          </div>

          <div class="dwolla-input-container">
            <label for="state">State</label>
            <input
              id="state"
              name="state"
              class="dwolla-customer-input dwolla-customer-state"
              type="text"
              placeholder="State"
              @change="${this.handleInput}"
            />
          </div>

          <div class="dwolla-input-container">
            <label for="postalCode">Postal Code</label>
            <input
              id="postalCode"
              name="postalCode"
              class="dwolla-customer-input dwolla-customer-postal"
              type="text"
              placeholder="Postal Code"
              @change="${this.handleInput}"
            />
          </div>

          <div class="dwolla-input-container">
            <label for="dob">Date Of Birth</label>
            <input
              id="dob"
              name="dob"
              class="dwolla-customer-input dwolla-customer-dob"
              type="text"
              placeholder="Date Of Birth (YYYY-MM-DD)"
              @change="${this.handleInput}"
            />
          </div>

          <div class="dwolla-input-container">
            <label for="ssn">SSN</label>
            <input
              id="ssn"
              name="ssn"
              class="dwolla-customer-input dwolla-customer-ssn"
              type="text"
              placeholder="SSN"
              @change="${this.handleInput}"
            />
          </div>

          <input
            class="dwolla-customer-input dwolla-customer-firstName"
            type="text"
            placeholder="First Name"
            value=${this.firstName}
            readonly
          />
          <input
            class="dwolla-customer-input dwolla-customer-lastName"
            type="text"
            placeholder="Last Name"
            value=${this.lastName}
            readonly
          />
          <input
            class="dwolla-customer-input dwolla-customer-email"
            type="text"
            placeholder="Email"
            value=${this.email}
            readonly
          />
          <input
            name="address1"
            class="dwolla-customer-input dwolla-customer-address1"
            type="text"
            placeholder="Address 1"
            @change="${this.handleInput}"
          />
          <input
            name="address2"
            class="dwolla-customer-input dwolla-customer-address2"
            type="text"
            placeholder="Address 2"
            @change="${this.handleInput}"
          />
          <input
            name="city"
            class="dwolla-customer-input dwolla-customer-city"
            type="text"
            placeholder="City"
            @change="${this.handleInput}"
          />
          <input
            name="state"
            class="dwolla-customer-input dwolla-customer-state"
            type="text"
            placeholder="State"
            @change="${this.handleInput}"
          />
          <input
            name="postalCode"
            class="dwolla-customer-input dwolla-customer-postal"
            type="text"
            placeholder="Postal Code"
            @change="${this.handleInput}"
          />
          <input
            name="dob"
            class="dwolla-customer-input dwolla-customer-dob"
            type="text"
            placeholder="Date Of Birth (YYYY-MM-DD)"
            @change="${this.handleInput}"
          />
          <input
            name="ssn"
            class="dwolla-customer-input dwolla-customer-ssn"
            type="text"
            placeholder="SSN"
            @change="${this.handleInput}"
          />

          <div class="dwolla-customer-tos">
            <div class="dwolla-customer-checkbox">
              <label for="termsCheckbox" style="display:none;"
                >Terms of Service Agreement</label
              >
              <input
                id="termsCheckbox"
                type="checkbox"
                id="dwolla-check"
                name="agreed"
                value="agree"
                @change="${this.handleInput}"
              />
            </div>
            <span class="dwolla-customer-text">
              By checking this box you agree to
              <a class="dwolla-link" href="${this.terms}" target="_blank"
                >Our Terms of Service</a
              >
              and
              <a class="dwolla-link" href="${this.privacy}" target="_blank"
                >Privacy Policy</a
              >
              as well as our Vendor
              <a
                class="dwolla-link"
                href="https://www.dwolla.com/legal/tos/"
                target="_blank"
                >Dwolla’s Terms of Service</a
              >
              and
              <a
                class="dwolla-link"
                href="https://www.dwolla.com/legal/privacy/"
                target="_blank"
                >Privacy Policy</a
              >
            </span>
          </div>
          <div class="dwolla-submit dwolla-customer-submit">
            <input
              class="${this.isLoading}"
              type="submit"
              value="Agree & Continue"
              @click="${this.handleSubmit}"
            />
          </div>
        </div>`;
    }
  }

  customElements.define("dwolla-customer-update", CustomerUpdate);
}
