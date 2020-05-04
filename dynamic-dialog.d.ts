import EtoolsDialog from './etools-dialog.js';

export interface ConfigObj {
   title?: string;
   size: string;
   okBtnText?: string;
   cancelBtnText?: string;
   closeCallback?: (...args: any[]) => any;
   content: any;
   removePadding?: boolean;
   theme?: string;
   [anyOtherAttribute: string]: any;
}

export function createDynamicDialog(config: ConfigObj): EtoolsDialog;
export function createDialog(title: string, size: string, okBtnText: string,
   cancelBtnText: string, closeCallback: object, content: string,
   removePadding?: boolean, theme?: string): EtoolsDialog;
export function removeDialog(dialogElement: EtoolsDialog): void;
