import * as React from "react";
import { ToastConsumer, ToastContextInterface, ToastVariant } from "~/context/ToastProvider";

export interface ToastType {
  readonly showToast: (message: string, variant: ToastVariant) => void;
}

export function toastHoc<T extends ToastType>(Child: React.ComponentType<T>): React.ComponentType<T> {
  return (props: T): JSX.Element => (
    <ToastConsumer>
      {({ showToast }: ToastContextInterface) => <Child showToast={showToast} {...props} />}
    </ToastConsumer>
  );
}
