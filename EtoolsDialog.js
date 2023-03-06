import {LitElement, html} from 'lit-element';
import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
import '@polymer/neon-animation/neon-animations.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@unicef-polymer/etools-loading/etools-loading';
import {DialogSpinnerMixin} from './dialog-spinner-mixin.js';
import {timeOut} from '@polymer/polymer/lib/utils/async.js';
import {getTranslation} from './utils/translate.js';

/**
 * @customElement
 * @appliesMixin DialogSpinnerMixin
 * @demo demo/index.html
 */
export class EtoolsDialog extends DialogSpinnerMixin(LitElement) { // eslint-disable-line new-cap
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
          };

        }

        paper-dialog {
          background-color: #fff;
          border-radius: 4px;
        }

        paper-dialog.sm {
          width: 450px;
        }

        paper-dialog.md {
          width: 720px;
        }

        paper-dialog.lg {
          width: 900px;
        }

        paper-dialog .dialog-title {
          margin: 0 !important;
          padding: 8px 24px;
          min-height: 40px;
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
          right: 14px;
          z-index: 1;
          margin: 0 !important;
          padding: 8px !important;
          opacity: 0.65;
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        paper-dialog.default .buttons {
          border-top: 1px solid var(--divider-color);
        }

        paper-dialog.default .dialog-title {
          line-height: 40px;
          background: var(--etools-dialog-primary-color, var(--primary-color));
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        paper-dialog.default paper-button.confirm-btn {
          min-width: 90px;
          margin-right: 0;
          background: var(--etools-dialog-default-btn-bg, var(--primary-color));
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        paper-button {
          color: initial;
        }

        paper-button:not(.confirm-btn) {
          opacity: 0.85;
        }

        paper-dialog.confirmation paper-button.confirm-btn {
          background: var(--etools-dialog-confirm-btn-bg, #ea4022);
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        paper-dialog.confirmation .close-btn, paper-dialog .cancel-btn {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }

        paper-dialog.confirmation .dialog-title {
          display: none;
        }

        paper-dialog.confirmation paper-dialog-scrollable {
          min-height: 80px;
          margin-top: 16px;
          margin-right: 56px;
          padding-right: 0 !important;
          font-size: 20px;
          line-height: 1.4;
          @apply --etools-dialog-confirmation-content;
        }

        paper-dialog-scrollable {
          --divider-color: #fff;
          --paper-dialog-scrollable: {
            @apply --etools-dialog-content;
            padding: 0;
          };
        }

        paper-dialog-scrollable.padded-content {
          --paper-dialog-scrollable: {
            @apply --etools-dialog-content;
            padding: 0 24px;
          };
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

        .dialog-title {
          padding-right:40px !important;
        }

        @media screen and (max-width: 930px) {
          paper-dialog.lg {
            width: calc(100vw - 30px);
          }
        }

        @media screen and (max-width: 767px) {
          paper-dialog.md {
            width: calc(100vw - 30px);
          }
        }

        @media screen and (max-width: 480px) {
          paper-dialog.sm {
            width: calc(100vw - 30px);
          }
        }

      </style>
      <focus-trap>
        <paper-dialog id="dialog" class="${this.getDialogClass(this.size, this.theme)}" part="ed-paper-dialog"
            ?opened="${this.opened}"
            @opened-changed="${(e) => {
    if (this.opened != e.detail.value) {
      this.opened = e.detail.value;
    }
  }}"
            ?with-backdrop="${this.backdrop}" modal="${this.modal}" entry-animation="scale-up-animation"
            exit-animation="fade-out-animation" @iron-overlay-closed="${this._dialogCloseHandling}"
            @iron-overlay-opened="${this._dialogOpenedHandling}" ?noAutoFocus="${this.noAutoFocus}"
            @dom-change="${this._onDomChange}">
          <paper-icon-button icon="close"
                            dialog-dismiss
                            class="close-btn"
                            ?disabled="${this.disableDismissBtn}">
          </paper-icon-button>
          <h2 class="dialog-title" part="ed-title">${this.dialogTitle}</h2>
          <etools-loading id="etoolsLoading" loading-text="${this.spinnerText}" ?active="${this.showSpinner}">
          </etools-loading>
          <paper-dialog-scrollable class="relative no-padding ${this.getScrollableDialogClass(this.noPadding)}"
                                  part="ed-scrollable">
            <div id="dialogContent"><slot tabindex="0"></slot></div>
            <div id="dynamicContent"></div>
          </paper-dialog-scrollable>

          <slot id="buttons" name="buttons">
            ${this.getButtonsHTML()}
          </slot>
        </paper-dialog>
      </focus-trap>
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  getButtonsHTML() {
    return this.showButtons ? html`
     <div class="buttons" part="ed-button-styles">
          <default-dialog-buttons
            class="${this.theme}"
            .disableDismissBtn="${this.disableDismissBtn}"
            .cancelBtnText="${this.cancelBtnText}"
            .keepDialogOpen="${this.keepDialogOpen}"
            .disableConfirmBtn="${this.disableConfirmBtn}"
            .hideConfirmBtn="${this.hideConfirmBtn}"
            .okBtnText="${this.okBtnText}"
          ></default-dialog-buttons>
     </div>`:
      html``;
  }

  _dialogCloseHandling(event) {
    if (event.detail.confirmed === undefined) {
      //* prevent handling, here, events fired by containing elements,
      // that also use the iron-overlay-behavior
      return;
    }
    this.dispatchEvent(new CustomEvent('close', {
      detail: {confirmed: event.detail.confirmed},
      bubbles: true,
      composed: true
    }));
  }

  _dialogOpenedHandling() {
    this.notifyResize();
  }

  _onDomChange() {
    this._domChangeDebouncer = Debouncer.debounce(this._domChangeDebouncer,
        timeOut.after(20),
        () => {
          this.notifyResize();
        });
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

  notifyResize() {
    this.getPaperDialog().notifyResize();
  }

  scrollDown() {
    setTimeout(() => {
      const d = this.getPaperDialog();
      if (d) {
        const dialogScrollable = d.querySelector('paper-dialog-scrollable');
        if (dialogScrollable) {
          const scrollTarget = dialogScrollable.scrollTarget;
          scrollTarget.scrollTop = scrollTarget.scrollHeight;
        }
      }
    }, 100);
  }
}

