import EtoolsDialog from './etools-dialog.js';

export function createDynamicDialog(config: object): EtoolsDialog;
export function createDialog(title: string, size: string, okBtnText: string,
   cancelBtnText: string, closeCallback: object, content: string,
   removePadding?: boolean, theme?: string): EtoolsDialog;
export function removeDialog(dialogElement: EtoolsDialog): void;
