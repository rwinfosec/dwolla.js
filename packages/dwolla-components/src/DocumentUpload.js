import './Error';
import './Success.js';

if (typeof HTMLElement !== "undefined") {
  const { LitElement, html } = require("lit-element");

  class DocumentUpload extends LitElement {
    static get properties() {
      return {
        customerId: {attribute: true},
        fileName: {type: String},
        successMessage: {type: String},
        errorMessage: {type: String}
      };
    }

    constructor() {
      super();
      this.documentType = 'license';
      this.fileName = 'No file selected.';
      this.styles = dwolla.styles();

      this.file;
      this.successMessage = '';
      this.errorMessage = '';
    }

    changeDocumentType(e) {
      this.documentType = e.target.value;
      this.requestUpdate();
    }

    handleSubmit() {
      if (this.validate()) {
        const formData = new FormData();
        formData.append('documentType', 'license');
        formData.append('file', this.file);
    
        dwolla.post(`customers/${this.customerId}/documents`, formData).then(res => {
          if (res && res.success) {
            this.handleSuccess();
          } else {
            this.handleError(res);
          }
        });
      }
    }
    
    handleInput(e) {
      this.file = e.target.files[0]
      this.fileName = this.file.name;
    }

    handleSuccess() {
      this.successMessage = "Document Uploaded Successfully.";
      this.errorMessage = "";
    }

    handleError(msg) {
      this.successMessage = "";
      this.errorMessage = msg;
    }

    validate() {
      if(!this.customerId) {
        this.errorMessage = "No customer specified.";
        return false;
      }

      if (!this.file) {
        this.errorMessage = "No file selected.";
        return false;
      }

      return true;
    }

    render() {
      return html`
      <link rel="stylesheet" href="${this.styles}">
      <div id="dwolla-document-upload">
        <dwolla-success message="${this.successMessage}"></dwolla-success>
        <dwolla-error message="${this.errorMessage}"></dwolla-error>
        <div class="dwolla-document-type">
          <label for="document-type-select" class="document-type-select-label">
            Document Type 
          </label><br>
          <select id="document-type-select" value="${this.documentType}" @change="${this.changeDocumentType}">
            <option value="license">License</option>
            <option value="passport">Passport</option>
            <option value="idCard">Id Card</option>
          </select>
        </div>

        <div class="dwolla-document-choose">
          <label for="file-upload" class="dwolla-document-chooser">
            Choose File
          </label>
          <input id="file-upload" type="file" @change="${this.handleInput}" />
        </div>

        <div class="dwolla-document-name-display">
          <span id="dwolla-document-name">${this.fileName}</span>
        </div>

        <div class="dwolla-document-submit">
          <input type="submit" value="Submit" @click="${this.handleSubmit}" />
        </div>
      </div>`;
    }
  }

  customElements.define("dwolla-document-upload", DocumentUpload);
}
