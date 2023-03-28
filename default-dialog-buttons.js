import {LitElement, html, css} from 'lit-element';
import {DialogSpinnerMixin} from './dialog-spinner-mixin';

export class DefaultDialogButtons extends DialogSpinnerMixin(LitElement) { // eslint-disable-line new-cap
  render() {
    return html`
      <paper-button dialog-dismiss class="cancel-btn" ?disabled="${this.disableDismissBtn}">
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
    `;
  }

  static get is() {
    return 'default-dialog-buttons';
  }

  static get properties() {
    return {
      disableConfirmBtn: Boolean,
      disableDismissBtn: Boolean,
      okBtnText: String,
      cancelBtnText: String,
      hideConfirmBtn: Boolean
    };
  }

  static get styles() {
    // language=css
    return [
      css`
        :host(.confirmation) paper-button.confirm-btn {
          background: var(--etools-dialog-confirm-btn-bg, #ea4022);
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }
        :host(.default) paper-button.confirm-btn {
          min-width: 90px;
          margin-inline-end: 0;
          background: var(--etools-dialog-default-btn-bg, var(--primary-color));
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        paper-dialog .cancel-btn {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }
      `
    ];
  }
}
