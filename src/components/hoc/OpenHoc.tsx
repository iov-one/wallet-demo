import { Omit, StateHandler, StateHandlerMap, withStateHandlers } from "recompose";

export interface OpenType {
  readonly open: boolean;
  readonly visited: boolean;
}

export interface OpenHandler extends StateHandlerMap<OpenType> {
  readonly toggle: StateHandler<OpenType>;
  readonly clickAway: StateHandler<OpenType>;
}

type OpenHoc<P, T> = React.ComponentType<Omit<P, keyof P> & T>;

export function openHoc<T>(
  comp: React.ComponentType<T & OpenType & OpenHandler>,
): OpenHoc<T & OpenType & OpenHandler, T> {
  return withStateHandlers<OpenType, OpenHandler, T>(
    { open: false, visited: false },
    {
      toggle: (state: OpenType) => (callBack?: () => void) => {
        // Check for avoid default pass event in the click handler
        if (callBack && typeof callBack === "function") {
          callBack();
        }
        return { open: !state.open, visited: true };
      },
      clickAway: () => () => ({ open: false, visited: true }),
    },
  )(comp);
}
