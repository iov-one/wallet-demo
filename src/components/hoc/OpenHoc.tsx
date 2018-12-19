import {
  InferableComponentEnhancerWithProps,
  Omit,
  StateHandler,
  StateHandlerMap,
  withStateHandlers,
} from "recompose";

export interface OpenType {
  readonly open: boolean;
}

export interface OpenHandler extends StateHandlerMap<OpenType> {
  readonly toggle: StateHandler<OpenType>;
  readonly clickAway: StateHandler<OpenType>;
}

/*
export default withStateHandlers<OpenType, OpenHandler>(
  { open: false },
  {
    toggle: (state: OpenType) => () => ({ open: !state.open }),
    clickAway: (_: OpenType) => () => ({ open: false }),
  },
);
*/

/*
export function openHoc<T extends {}>(): InferableComponentEnhancerWithProps<T & OpenType & OpenHandler, T> {
  return withStateHandlers<OpenType, OpenHandler, T>(
    { open: false },
    {
      toggle: (state: OpenType) => () => ({ open: !state.open }),
      clickAway: () => () => ({ open: false }),
    },
  );
}
*/

type OpenHoc<P, T> = React.ComponentType<Omit<P, keyof P> & T>;

export function openHoc<T>(
  comp: React.ComponentType<T & OpenType & OpenHandler>,
): OpenHoc<T & OpenType & OpenHandler, T> {
  const enhancer: InferableComponentEnhancerWithProps<T & OpenType & OpenHandler, T> = withStateHandlers<
    OpenType,
    OpenHandler,
    T
  >(
    { open: false },
    {
      toggle: (state: OpenType) => () => ({ open: !state.open }),
      clickAway: () => () => ({ open: false }),
    },
  );

  return enhancer(comp);
}
