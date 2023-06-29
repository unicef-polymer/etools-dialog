import {property} from 'lit-element';
import {getTranslation} from './utils/translate';
declare global {
  interface Window {
    EtoolsLanguage: any;
  }
}
/**
 * @polymer
 * @mixinFunction
 * @demo demo/index-spinner.html
 */
export function DialogSpinnerMixin(baseClass: any) {
  class DialogSpinnerMixinClass extends baseClass {
    @property({type: Boolean, reflect: true, attribute: 'keep-dialog-open'})
    keepDialogOpen: boolean;
    @property({type: Boolean, reflect: true, attribute: 'show-spinner'})
    showSpinner: boolean;
    @property({type: String, attribute: 'spinner-text'})
    spinnerText: string;
    @property({type: String})
    language!: string;

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

    handleLanguageChange(e: any) {
      this.language = e.detail.language;
    }

    _confirmBtClicked() {
      if (this.keepDialogOpen) {
        this.dispatchEvent(new CustomEvent('confirm-btn-clicked', {bubbles: true, composed: true}));
      } else {
        this.dispatchEvent(
          new CustomEvent('close', {
            detail: {confirmed: true},
            bubbles: true,
            composed: true
          })
        );
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
  }
  return DialogSpinnerMixinClass;
}
