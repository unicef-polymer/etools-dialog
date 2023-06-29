var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from 'lit-element';
import { getTranslation } from './utils/translate';
/**
 * @polymer
 * @mixinFunction
 * @demo demo/index-spinner.html
 */
export function DialogSpinnerMixin(baseClass) {
    class DialogSpinnerMixinClass extends baseClass {
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
                this.dispatchEvent(new CustomEvent('confirm-btn-clicked', { bubbles: true, composed: true }));
            }
            else {
                this.dispatchEvent(new CustomEvent('close', {
                    detail: { confirmed: true },
                    bubbles: true,
                    composed: true
                }));
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
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'keep-dialog-open' })
    ], DialogSpinnerMixinClass.prototype, "keepDialogOpen", void 0);
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'show-spinner' })
    ], DialogSpinnerMixinClass.prototype, "showSpinner", void 0);
    __decorate([
        property({ type: String, attribute: 'spinner-text' })
    ], DialogSpinnerMixinClass.prototype, "spinnerText", void 0);
    __decorate([
        property({ type: String })
    ], DialogSpinnerMixinClass.prototype, "language", void 0);
    return DialogSpinnerMixinClass;
}
