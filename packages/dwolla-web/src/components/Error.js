if (typeof HTMLElement !== "undefined") {
    const { LitElement, html } = require("lit-element");

    class Error extends LitElement {
        static get properties() {
            return {
                message: { type: String }
            };
        }

        constructor() {
            super();
            this.styles = dwolla.styles();
            this.message = '';
        }

        shouldDisplay() {
            if (this.message) {
                return 'block';
            } else {
                return 'none';
            }
        }

        render() {
            return html`
        <link rel="stylesheet" href="${this.styles}">
        <div id="dwolla-error" style="display:${this.shouldDisplay()};">
            <span id="dwolla-error-message">${this.message}</span>
        </div>`;
        }

        createRenderRoot() {
            /**
             * Render template without shadow DOM. Note that shadow DOM features like
             * encapsulated CSS and slots are unavailable.
             */
            return this;
        }
    }

    customElements.define("dwolla-error", Error);
}
