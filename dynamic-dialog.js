/* eslint-disable linebreak-style */
/* Create etools-dialog programmatically and add them directly to the body.
  Now paper-dialog has an issues and the backdrop that covers all the content(if dialog is not a child of body),
  everything becomes unselectable.
  This way of creating the dialog will fix the issue. */

import './etools-dialog.js';
import {logError} from '@unicef-polymer/etools-behaviors/etools-logging';

export function createDynamicDialog(config) {
  if (!_validateParams(config)) {
    return null;
  }

  let dialog = document.createElement('etools-dialog');
  _applyDefaultDialogConfig(dialog);

  for (let propertyName in config) {
    if (!config.hasOwnProperty(propertyName) || propertyName === 'closeCallback') {
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

  let msgPlaceholder = dialog.shadowRoot.querySelector('#dynamicContent');
  msgPlaceholder.appendChild(config.content);
  return dialog;
}

export function createDialog(title, size, okBtnText, cancelBtnText, closeCallback, content, removePadding, theme) {
  let config = {
    title: title,
    size: size,
    okBtnText: okBtnText,
    cancelBtnText: cancelBtnText,
    closeCallback: closeCallback,
    content: content,
    noPadding: removePadding,
    theme: theme
  };
  let dialog = createDynamicDialog(config);
  document.querySelector('body').appendChild(dialog);
  return dialog;
}

export function removeDialog(dialogElement) {
  document.querySelector('body').removeChild(dialogElement);
}

function _validateParams(config) {
  if (typeof config.content === 'undefined' || config.content === null) {
    // eslint-disable-next-line no-console
    logError('[DynamicDialogBehavior] You must provide a valid dialog content');
    return false;
  }
  return true;
}

function _applyDefaultDialogConfig(dialog) {
  dialog.theme = 'confirmation';
  dialog.okBtnText = 'Yes';
  dialog.cancelBtnText = 'No';
}


