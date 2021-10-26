/**
 * @polymer
 * @mixinFunction
 * @demo demo/index-spinner.html
 */
export const DialogSpinnerMixin = baseClass => class extends baseClass {
  static get properties() {
    return {
      keepDialogOpen: {
        type: Boolean,
        reflect: true,
        attribute: 'keep-dialog-open'
      },
      showSpinner: {
        type: Boolean,
        reflect: true
      },
      spinnerText: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.keepDialogOpen = false;
    this.showSpinner = false;
    this.spinnerText = 'Saving data..';
  }

  _confirmBtClicked() {
    if (this.keepDialogOpen) {
      this.dispatchEvent(new CustomEvent('confirm-btn-clicked', {bubbles: true, composed: true}));
    }
  }

  startSpinner() {
    this.disableConfirmBtn = true;
    this.showSpinner = true;
  }

  stopSpinner() {
    this.disableConfirmBtn = false;
    this.showSpinner = false;
  }
};
