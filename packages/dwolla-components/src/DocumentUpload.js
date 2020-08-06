if (typeof HTMLElement !== "undefined") {
  const { LitElement, html } = require("lit-element");

  class DocumentUpload extends LitElement {
    render() {
      return html`<div>Hello from DocumentUpload web component!</div>`;
    }
  }

  customElements.define("dwolla-document-upload", DocumentUpload);
}
