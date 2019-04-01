

import { PolymerElement } from '@polymer/polymer';

interface Constructor<T> {
  new(...args: any[]): T;
}

declare function DynamicDialogMixin<T extends Constructor<PolymerElement>>(base: T): {
  new (...args: any[]): {
    createDialog(title: any, size: any, okBtnText: any, cancelBtnText: any, closeCallback: any, content: any, removePadding?: any, theme?: any): any;
    createDynamicDialog(config: any): any;
    removeDialog(dialogElement: any): void;
  }
} & T & Constructor<PolymerElement>;

export {DynamicDialogMixin};

