if (typeof HTMLElement !== "undefined") {
  const { LitElement, html } = require("lit-element");

  class DocumentUpload extends LitElement {
    constructor() {
      super();
      this.docType = "hi";
    }

    changeDocType(e) {
      this.docType = e.target.value;
      this.requestUpdate();
    }

    handleSubmit() {
      dwolla.post();
    }

    render() {
      return html`<div>
        <div>type: ${this.docType}</div>

        <div>
          <select value="${this.docType}" @change="${this.changeDocType}">
            <option value="license">License</option>
            <option value="passport">Passport</option>
          </select>
        </div>

        <div>
          <input type="file" />
        </div>

        <div>
          <input type="submit" @click="${this.handleSubmit}" />
        </div>
      </div>`;
    }
  }

  customElements.define("dwolla-document-upload", DocumentUpload);
}
