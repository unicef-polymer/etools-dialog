import {getTranslation} from './utils/translate';

/**
 * @polymer
 * @mixinFunction
 * @demo demo/index-spinner.html
 */
export const DialogSpinnerMixin = (baseClass) =>
  class extends baseClass {
    static get properties() {
      return {
        keepDialogOpen: {
          type: Boolean,
          reflect: true,
          attribute: 'keep-dialog-open'
        },
        showSpinner: {
          type: Boolean,
          reflect: true,
          attribute: 'show-spinner'
        },
        spinnerText: {
          type: String,
          attribute: 'spinner-text'
        },
        language: {
          type: String
        }
      };
    }

    constructor() {
      super();
      this.keepDialogOpen = false;
      this.showSpinner = false;
      if (!this.language) {
        this.language = window.EtoolsLanguage || 'en';
      }

      this.spinnerText = getTranslation(this.language, 'SAVING_DATA');
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
