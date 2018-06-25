import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import './add-edit-some-item-dialog.js';


/**
 * @polymer
 * @customElement
 * @demo demo/index-spinner.html
 */
class DemoSaveInDialog extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <style>
        paper-button {
          background-color: #006EFF;
          color: white;
        }

        [hidden] {
          display: none !important;
        }
      </style>

      <paper-button on-tap="_openDialogWithOkApiCall"> Open Dialog Window with Successful Api call</paper-button>
      <paper-button on-tap="_openDialogWithNotOkApiCall"> Open Dialog Window with error on Api call</paper-button>
    `;
  }

  static get is() {
    return 'demo-dialog-spinner';
  }

  ready() {
    super.ready();
    this.addEditDialog = document.createElement('add-edit-some-item-dialog');
    this.addEditDialog.setAttribute('id', 'addEditDialog');
    document.querySelector('body').appendChild(this.addEditDialog);

  }

  _openDialogWithOkApiCall() {
    this.addEditDialog.successfulApiCall = true;
    this.addEditDialog.open();
  }

  _openDialogWithNotOkApiCall() {
    this.addEditDialog.successfulApiCall = false;
    this.addEditDialog.open();
  }
}

customElements.define(DemoSaveInDialog.is, DemoSaveInDialog);
