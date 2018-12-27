import { MuiThemeProvider } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { history, makeStore } from "~/store";
import theme from "~/theme/mui";

import "~/index.scss";
import "./index.scss";

interface Props {
  readonly children: JSX.Element;
  readonly matchMedia: boolean;
}

export const RootMatchMedia = ({ children, matchMedia }: Props) => (
  <Provider store={makeStore()}>
    <MuiThemeProvider theme={theme}>
      <MatchMediaContext.Provider value={matchMedia}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </MatchMediaContext.Provider>
    </MuiThemeProvider>
  </Provider>
);
