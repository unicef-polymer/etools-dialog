import {LitElement, html} from 'lit-element';
import '@polymer/neon-animation/neon-animations.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@unicef-polymer/etools-loading/etools-loading';
import {DialogSpinnerMixin} from './dialog-spinner-mixin.js';
import {getTranslation} from './utils/translate.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

/**
 * @customElement
 * @appliesMixin DialogSpinnerMixin
 * @demo demo/index.html
 */
export class EtoolsDialog extends DialogSpinnerMixin(LitElement) {
  // eslint-disable-line new-cap
  render() {
    // language=HTML
    return html`
      <style>
        :host {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
          --etools-dialog-content: {
            width: 100%;
            max-width: 100% !important;
            max-height: calc(90vh - 132px) !important; /* 90vh - (header height + buttons section height) */
            overflow-x: hidden;
            overflow-y: auto;
            display: block;
            margin-top: 0;
          }
        }

        sl-dialog::part(overlay) {
          background-color: rgb(0 0 0);
          opacity: 0.6;
        }

        paper-button.confirm-btn {
          background: var(--etools-dialog-confirm-btn-bg, #ea4022);
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }
        paper-button.confirm-btn.default {
          min-width: 90px;
          margin-inline-end: 0;
          background: var(--etools-dialog-default-btn-bg, var(--primary-color));
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        sl-dialog .cancel-btn {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }

        sl-dialog.sm {
          --width: 450px;
        }

        sl-dialog.md {
          --width: 720px;
        }

        sl-dialog.lg {
          --width: 900px;
        }

        .buttons {
          margin-top: 16px;
          padding: 8px;
          display: flex;
          justify-content: flex-end;
        }

        paper-icon-button {
          position: absolute;
          top: 9px;
          inset-inline-end: 14px;
          z-index: 1;
          margin: 0 !important;
          padding: 8px !important;
          opacity: 0.65;
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        sl-dialog.default .buttons {
          border-top: 1px solid var(--divider-color);
        }

        sl-dialog.default::part(title) {
          line-height: 40px;
          font-weight: 500;
          background: var(--etools-dialog-primary-color, var(--primary-color));
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        sl-dialog.default paper-button.confirm-btn {
          min-width: 90px;
          margin-inline-end: 0;
          background: var(--etools-dialog-default-btn-bg, var(--primary-color));
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        paper-button {
          color: initial;
        }

        paper-button:not(.confirm-btn) {
          opacity: 0.85;
        }

        sl-dialog.confirmation paper-button.confirm-btn {
          background: var(--etools-dialog-confirm-btn-bg, #ea4022);
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        sl-dialog.confirmation .close-btn,
        paper-dialog .cancel-btn {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }

        sl-dialog.confirmation::part(header-actions) {
          padding: 15px 15px 0 15px;
        }
        sl-dialog::part(title) {
          padding: 8px 0 8px 24px;
        }
        sl-dialog.confirmation::part(title) {
          padding: 15px 15px 0 15px;
        }
        sl-dialog {
          --footer-spacing: 0;
          --body-spacing: 12px 0 16px 0;
        }
        sl-dialog.confirmation {
          --footer-spacing: 25px 0 0 0;
        }

        sl-dialog.default::part(body) {
          border-top: 1px solid var(--dark-divider-color);
        }

        sl-dialog.confirmation::part(body) {
          max-width: 90%;
          font-size: 20px;
          line-height: 1.4;
          padding: 0;
          padding-inline: 15px;
          border-top: none;
          margin-top: -15px;
          margin-bottom: 10px;
          @apply --etools-dialog-confirmation-content;
        }

        :host([padded-content]) sl-dialog::part(body) {
          padding-inline-start: 24px;
          padding-inline-end: 24px;
        }

        .relative {
          position: relative;
        }

        etools-loading {
          margin-top: 0px;
        }

        #dialogContent {
          height: 100%;
        }

        @media screen and (max-width: 930px) {
          sl-dialog.lg {
            width: calc(100vw - 30px);
          }
        }

        @media screen and (max-width: 767px) {
          sl-dialog.md {
            width: calc(100vw - 30px);
          }
        }

        @media screen and (max-width: 480px) {
          sl-dialog.sm {
            width: calc(100vw - 30px);
          }
        }
      </style>
      <sl-dialog
        id="dialog"
        class="${this.getDialogClass(this.size, this.theme)}"
        part="ed-paper-dialog"
        .label="${this.dialogTitle}"
        ?open="${this.opened}"
        exportparts="body,title,footer"
      >
        <etools-loading id="etoolsLoading" loading-text="${this.spinnerText}" ?active="${this.showSpinner}">
        </etools-loading>
        <slot></slot>
        <div id="dynamicContent"></div>
        <slot slot="footer" id="buttons" name="buttons"> ${this.getButtonsHTML()} </slot>
      </sl-dialog>
    `;
  }

  static get is() {
    return 'etools-dialog';
  }

  static get properties() {
    return {
      dialogTitle: {
        type: String,
        reflect: true,
        attribute: 'dialog-title'
      },
      okBtnText: {
        type: String,
        reflect: true,
        attribute: 'ok-btn-text'
      },
      cancelBtnText: {
        type: String,
        reflect: true,
        attribute: 'cancel-btn-text'
      },
      size: {
        type: String
      },
      opened: {
        type: Boolean,
        reflect: true
      },
      backdrop: {
        type: Boolean
      },
      modal: {
        type: Boolean
      },
      noPadding: {
        type: Boolean,
        reflect: true,
        attribute: 'no-padding'
      },
      disableConfirmBtn: {
        type: Boolean,
        reflect: true,
        attribute: 'disable-confirm-btn'
      },
      disableDismissBtn: {
        type: Boolean,
        reflect: true,
        attribute: 'disable-dismiss-btn'
      },
      hideConfirmBtn: {
        type: Boolean,
        reflect: true,
        attribute: 'hide-confirm-btn'
      },
      theme: {
        type: String,
        reflect: true
      },
      noAutoFocus: {
        type: Boolean,
        reflect: true,
        attribute: 'no-auto-focus'
      },
      showButtons: {
        type: Boolean,
        reflect: true,
        attribute: 'show-buttons'
      },
      language: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {
    this.dialogTitle = '';
    this.okBtnText = getTranslation(this.language, 'OK');
    this.cancelBtnText = getTranslation(this.language, 'CANCEL');
    this.size = 'sm';
    this.opened = false;
    this.backdrop = true;
    this.modal = true;
    this.noPadding = false;
    this.disableConfirmBtn = false;
    this.disableDismissBtn = false;
    this.hideConfirmBtn = false;
    this.theme = 'default';
    this.noAutoFocus = false;
    this.showButtons = true;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    this.addEventListener('sl-request-close', (event) => {
      if (event.detail.source === 'overlay') {
        console.log(event.detail.source);
        event.preventDefault();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  getButtonsHTML() {
    return this.showButtons
      ? html` <div class="buttons" part="ed-button-styles" slot="footer">
          <paper-button @click="${this._cancelBtClicked}" class="cancel-btn" ?disabled="${this.disableDismissBtn}">
            ${this.cancelBtnText}
          </paper-button>
          <paper-button
            ?dialog-confirm="${!this.keepDialogOpen}"
            @click="${this._confirmBtClicked}"
            ?disabled="${this.disableConfirmBtn}"
            ?hidden="${this.hideConfirmBtn}"
            class="confirm-btn"
          >
            ${this.okBtnText}
          </paper-button>
        </div>`
      : html``;
  }

  _dialogCloseHandling(event) {
    if (event.detail.confirmed === undefined) {
      //* prevent handling, here, events fired by containing elements,
      // that also use the iron-overlay-behavior
      return;
    }
    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {confirmed: event.detail.confirmed},
        bubbles: true,
        composed: true
      })
    );
  }

  _cancelBtClicked() {
    this.opened = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {confirmed: false},
        bubbles: true,
        composed: true
      })
    );
  }

  getDialogClass(size, theme) {
    return size + ' ' + theme;
  }

  getScrollableDialogClass(noPadding) {
    return noPadding ? '' : 'padded-content';
  }

  getPaperDialog() {
    return this.shadowRoot.querySelector('#dialog');
  }

  scrollDown() {
    setTimeout(() => {
      const d = this.getPaperDialog();
      if (d) {
        const scrollableContent = d.shadowRoot.querySelector('slot[part="body"]');
        if (scrollableContent) {
          scrollableContent.scrollTop = scrollableContent.scrollHeight;
        }
      }
    }, 100);
  }
}
