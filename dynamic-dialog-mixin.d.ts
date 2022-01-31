import {LitElement} from 'lit-element';

interface Constructor<T> {
  new(...args: any[]): T;
}

declare function DynamicDialogMixin<T extends Constructor<LitElement>>(base: T): {
  new (...args: any[]): {
    createDialog(title: any, size: any, okBtnText: any, cancelBtnText: any, closeCallback: any, content: any, removePadding?: any, theme?: any): any;
    createDynamicDialog(config: any): any;
    removeDialog(dialogElement: any): void;
  }
} & T & Constructor<LitElement>;

export {DynamicDialogMixin};

