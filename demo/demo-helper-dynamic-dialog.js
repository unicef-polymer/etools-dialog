import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {DynamicDialogMixin} from '../dynamic-dialog-mixin.js';
import '../etools-dialog.js';
import '@polymer/paper-button/paper-button.js';


/**
 * @polymer
 * @customElement
 * @demo demo/index-dynamic.html
 */
class DemoHelperDynamicDialog extends DynamicDialogMixin(PolymerElement) {
  static get template() {
    // language=HTML
    return html`
      <style>
        paper-button {
          margin-bottom: 24px;
        }

        .red {
          background-color: #EE8282;
        }
      </style>
      <div>
        <paper-button class="red" raised="" on-tap="_openDialogWithConfirmationMsgStyle">
          Open dialog (confirmation message style)
        </paper-button>
      </div>
    `;
  }

  static get is() {
    return 'demo-helper-dynamic-dialog';
  }

  static get properties() {
    return {
      confirmationDialog: Object
    };
  }

  ready() {
    super.ready();
    // add a dialog programmatically then open it
    var dialogContent = document.createElement('div');
    dialogContent.classList.add('confirmation-content');
    dialogContent.innerHTML = 'This is a dynamically created dialog ... yey!';
    this.confirmationDialog = this.createDialog('Dynamic dialog title', 'md', 'Ok', 'Close',
        this._dynamicDialogCloseCallback, dialogContent);
  }

  _openDialogWithConfirmationMsgStyle() {
    this.confirmationDialog.opened = true;
  }

  _dynamicDialogCloseCallback(event) {
    console.log('dynamic dialog closed', event.detail);
  }
}

customElements.define(DemoHelperDynamicDialog.is, DemoHelperDynamicDialog);
