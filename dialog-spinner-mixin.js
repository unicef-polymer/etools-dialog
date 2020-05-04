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
        value: false,
        reflectToAttribute: true
      },
      showSpinner: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      spinnerText: {
        type: String,
        value: 'Saving data..'
      }
    };
  }

  _confirmBtClicked() {
    if (this.keepDialogOpen) {
      this.dispatchEvent(new CustomEvent('confirm-btn-clicked', {bubbles: true, composed: true}));
    }
  }

  startSpinner() {
    this.set('disableConfirmBtn', true);
    this.set('showSpinner', true);
  }

  stopSpinner() {
    this.set('disableConfirmBtn', false);
    this.set('showSpinner', false);
  }
};
