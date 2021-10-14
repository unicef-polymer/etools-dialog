/* Create etools-dialog programmatically and add them directly to the body.
     Now paper-dialog has an issues and the backdrop that covers all the content(if dialog is not a child of body),
     everything becomes unselectable.
     This behaviour will fix the issue. */

import EtoolsLogsMixin from '@unicef-polymer/etools-behaviors/etools-logs-mixin.js';

import './etools-dialog.js';

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin EtoolsLogsMixin
 * @demo demo/index-dynamic.html
 * !!! DEPRECATED - use the exported methods form dynamic-dialog.js
 */
export const DynamicDialogMixin = baseClass => class extends EtoolsLogsMixin(baseClass) {

  createDialog(title, size, okBtnText, cancelBtnText, closeCallback, content, removePadding, theme) {
    const config = {
      title: title,
      size: size,
      okBtnText: okBtnText,
      cancelBtnText: cancelBtnText,
      closeCallback: closeCallback,
      content: content,
      noPadding: removePadding,
      theme: theme
    };
    const dialog = this.createDynamicDialog(config);
    document.querySelector('body').appendChild(dialog);
    return dialog;
  }

  createDynamicDialog(config) {
    if (!this._validateParams(config)) {
      return null;
    }

    const dialog = document.createElement('etools-dialog');
    this._applyDefaultDialogConfig(dialog);

    for (const propertyName in config) {
      if (!Object.prototype.hasOwnProperty.call(config, propertyName) || propertyName === 'closeCallback') {
        continue;
      }
      if (propertyName === 'noPadding' && typeof config[propertyName] === 'boolean') {
        dialog.noPadding = config.noPadding;
        continue;
      }
      if (typeof config[propertyName] === 'string' && config[propertyName] !== '') {
        dialog[propertyName] = config[propertyName];
      }
    }
    // set close callback
    if (config.closeCallback) {
      dialog.addEventListener('close', function(event) {
        config.closeCallback(event);
      });
    }

    document.querySelector('body').appendChild(dialog);

    const msgPlaceholder = dialog.shadowRoot.querySelector('#dynamicContent');
    msgPlaceholder.appendChild(config.content);
    return dialog;
  }

  _validateParams(config) {
    if (typeof config.content === 'undefined' || config.content === null) {
      // eslint-disable-next-line no-console
      this.logError('[DynamicDialogBehavior] You must provide a valid dialog content');
      return false;
    }
    return true;
  }

  _applyDefaultDialogConfig(dialog) {
    dialog.theme = 'confirmation';
    dialog.okBtnText = 'Yes';
    dialog.cancelBtnText = 'No';
  }

  removeDialog(dialogElement) {
    document.querySelector('body').removeChild(dialogElement);
  }
};
