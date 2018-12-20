import { MuiThemeProvider } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { history, makeStore } from "~/store";
import theme from "~/theme/mui";
import Header from "./index";

import "~/index.scss";

storiesOf("Components /header", module).add("Header for desktop", () => (
  <Provider store={makeStore()}>
    <MuiThemeProvider theme={theme}>
      <MatchMediaContext.Provider value={false}>
        <ConnectedRouter history={history}>
          <div style={{ height: "300px", backgroundColor: "grey" }}>
            <Header />
          </div>
        </ConnectedRouter>
      </MatchMediaContext.Provider>
    </MuiThemeProvider>
  </Provider>
));
