import { MuiThemeProvider } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { DeepPartial } from "redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { ToastProvider } from "~/context/ToastProvider";
import { RootState } from "~/reducers";
import { aNewStore, history } from "~/store";
import theme from "~/theme/mui";

import "~/index.scss";
import "./index.scss";

interface Props {
  readonly children: React.ReactNode;
  readonly matchMedia: boolean;
  readonly storeProps?: DeepPartial<RootState>;
}

export const RootMatchMedia = ({ storeProps = {}, children, matchMedia }: Props) => (
  <Provider store={aNewStore(storeProps)}>
    <MuiThemeProvider theme={theme}>
      <MatchMediaContext.Provider value={matchMedia}>
      <ToastProvider>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </ToastProvider>
      </MatchMediaContext.Provider>
    </MuiThemeProvider>
  </Provider>
);
