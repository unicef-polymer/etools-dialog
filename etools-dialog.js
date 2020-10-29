import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
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

/**
 * @customElement
 * @appliesMixin DialogSpinnerMixin
 * @demo demo/index.html
 */
class EtoolsDialog extends DialogSpinnerMixin(PolymerElement) { // eslint-disable-line new-cap
  static get template() {
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
          @apply --etools-dialog-title;
        }

        .buttons {
          margin-top: 16px;
          padding: 8px;
          @apply --etools-dialog-button-styles;
          @apply --layout-horizontal;
          @apply --layout-end-justified;
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
          @apply --etools-dialog-scrollable;
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
          margin-top: -20px;
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
      <paper-dialog id="dialog" class\$="[[getDialogClass(size, theme)]]" opened="{{opened}}"
                    with-backdrop="[[backdrop]]" modal="[[modal]]" entry-animation="scale-up-animation"
                    exit-animation="fade-out-animation" on-iron-overlay-closed="_dialogCloseHandling"
                    on-iron-overlay-opened="_dialogOpenedHandling" no-auto-focus="[[noAutoFocus]]"
                    on-dom-change="_onDomChange">
        <paper-icon-button icon="close"
                           dialog-dismiss
                           class="close-btn"
                           disabled="[[disableDismissBtn]]">
        </paper-icon-button>
        <h2 class="dialog-title">[[dialogTitle]]</h2>

        <paper-dialog-scrollable class\$="relative no-padding [[getScrollableDialogClass(noPadding)]]">
          <div id="dialogContent"><slot></slot></div>
          <div id="dynamicContent"></div>
          <etools-loading id="etoolsLoading" loading-text="[[spinnerText]]" active="[[showSpinner]]"></etools-loading>
        </paper-dialog-scrollable>

        <slot name="buttons">
          <div class="buttons">
            <paper-button dialog-dismiss
                          class="cancel-btn"
                          disabled="[[disableDismissBtn]]">
              [[cancelBtnText]]
            </paper-button>
            <paper-button dialog-confirm\$="[[!keepDialogOpen]]" on-tap="_confirmBtClicked" autofocus
                          disabled="{{disableConfirmBtn}}" hidden="[[hideConfirmBtn]]" class="confirm-btn">
              [[okBtnText]]
            </paper-button>
          </div>
        </slot>
      </paper-dialog>
    `;
  }

  static get is() {
    return 'etools-dialog';
  }

  static get properties() {
    return {
      dialogTitle: {
        type: String,
        value: ''
      },
      okBtnText: {
        type: String,
        value: 'Ok'
      },
      cancelBtnText: {
        type: String,
        value: 'Cancel'
      },
      size: {
        type: String,
        value: 'sm'
      },
      opened: {
        type: Boolean,
        value: false,
        notify: true
      },
      backdrop: {
        type: Boolean,
        value: true
      },
      modal: {
        type: Boolean,
        value: true
      },
      noPadding: {
        type: Boolean,
        value: false,
        observer: '_noContentPaddingChanged'
      },
      disableConfirmBtn: {
        type: Boolean,
        value: false
      },
      disableDismissBtn: {
        type: Boolean,
        value: false
      },
      hideConfirmBtn: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      theme: {
        type: String,
        value: 'default',
        reflectToAttribute: true
      },
      noAutoFocus: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
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

  _noContentPaddingChanged(noPaddingValue) {
    if (noPaddingValue === undefined) {
      return;
    }
    this.updateStyles();
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

customElements.define(EtoolsDialog.is, EtoolsDialog);

export default EtoolsDialog;
