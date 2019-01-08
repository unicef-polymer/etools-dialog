import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../etools-dialog.js';
import 'etools-loading/etools-loading.js';
import '@polymer/iron-ajax/iron-request.js';

/**
 * @polymer
 * @customElement
 */
class AddEditSomeItemDialog extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <style>
        [hidden] {
          display: none !important;
        }

        #divErroMsg {
          padding: 10px;
          border: solid 1px red;
          background-color: pink
        }
      </style>
      <div>
        <iron-request id="xhrEl"></iron-request>
        <etools-dialog id="saveDialog" keep-dialog-open="" on-confirm-btn-clicked="_save" size="md" opened="[[opened]]"
                       dialog-title="Some title" on-close="onClose" ok-btn-text="Save">
          <div id="divErroMsg" hidden\$="[[!showError]]">
            There was an error saving data ...
          </div>
          <h3>Some subtitle</h3>
          <p>Some paragraph</p>
          Form content goes here...
        </etools-dialog>
      </div>
    `;
  }

  static get is() {
    return 'add-edit-some-item-dialog';
  }

  static get properties() {
    return {
      showError: {
        type: Boolean,
        value: false
      },
      successfulApiCall: {
        type: Boolean,
        value: true
      },
      opened: {
        type: Boolean,
        value: false
      }
    };
  }

  onClose() {
    this.showError = false;
    this.$.saveDialog.stopSpinner();
  }

  open() {
    this.$.saveDialog.opened = true;
  }

  _save() {
    var self = this;
    var url = 'https://httpbin.org/delay/2';
    if (!this.successfulApiCall) {
      url = 'https://httpbin.org/status/500';
    }
    self.$.saveDialog.startSpinner();
    var req = document.createElement('iron-request');
    req.send({url: url, headers: {'Cache-Control': 'no-cache'}});
    req.completes.then(function (resp) {
      self.$.saveDialog.stopSpinner();
      self.$.saveDialog.opened = false;
    }).catch(function (err) {
      console.log('Error caught', err);
      self.$.saveDialog.stopSpinner();
      self.showError = true;
    });
  }
}

customElements.define(AddEditSomeItemDialog.is, AddEditSomeItemDialog);
