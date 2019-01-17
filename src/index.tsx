import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import MatchMedia from "./context/MatchMediaContext";
import { ToastProvider } from "./context/ToastProvider";
import Route from "./routes";
import { history, makeStore } from "./store";
import theme from "./theme/mui";

import "./index.scss";

const store = makeStore();

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MatchMedia>
        <ToastProvider>
          <ConnectedRouter history={history}>
            <Route />
          </ConnectedRouter>
        </ToastProvider>
      </MatchMedia>
    </MuiThemeProvider>
  </Provider>
);

const HotRoot = hot(Root);

ReactDOM.render(<HotRoot />, document.getElementById("app"));
