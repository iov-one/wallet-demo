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
      toggle: (state: OpenType) => () => ({ open: !state.open, visited: true }),
      clickAway: () => () => {
        console.log("On clickaway");
        return { open: false, visited: true };
      },
    },
  )(comp);
}
